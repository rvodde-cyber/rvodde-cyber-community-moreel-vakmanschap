/**
 * Blind temporary mailbox for Setup encrypted blobs.
 *
 * Prefers Upstash Redis (Vercel KV-compatible) when REST credentials exist.
 * Falls back to an in-process Map for local development and unit tests.
 * The store never inspects ciphertext — it only persists opaque strings + TTL.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const memoryStore = globalThis.__setupMailboxMemory || new Map();
globalThis.__setupMailboxMemory = memoryStore;

function hasUpstash() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function blobKey(trajectoryId, role, respondentId) {
  return `setup:blob:${trajectoryId}:${role}:${respondentId}`;
}

function indexKey(trajectoryId) {
  return `setup:index:${trajectoryId}`;
}

function fileStorePath() {
  return process.env.SETUP_MAILBOX_DIR || path.join(os.tmpdir(), "setup-mailbox");
}

function ensureFileStore() {
  const dir = fileStorePath();
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function readFileEntry(key) {
  const file = path.join(ensureFileStore(), encodeURIComponent(key) + ".json");
  if (!fs.existsSync(file)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      fs.unlinkSync(file);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}

function writeFileEntry(key, value, ttlSeconds) {
  const file = path.join(ensureFileStore(), encodeURIComponent(key) + ".json");
  const payload = {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
  fs.writeFileSync(file, JSON.stringify(payload));
}

function deleteFileEntry(key) {
  const file = path.join(ensureFileStore(), encodeURIComponent(key) + ".json");
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

async function upstashCommand(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`upstash_error:${response.status}:${text}`);
  }
  const data = await response.json();
  if (data.error) throw new Error(`upstash_error:${data.error}`);
  return data.result;
}

function memoryGet(key) {
  const entry = memoryStore.get(key);
  if (!entry) return null;
  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    memoryStore.delete(key);
    return null;
  }
  return entry.value;
}

function memorySet(key, value, ttlSeconds) {
  memoryStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

function memoryDel(key) {
  memoryStore.delete(key);
}

async function storeGet(key) {
  if (hasUpstash()) {
    const result = await upstashCommand(["GET", key]);
    return result ? JSON.parse(result) : null;
  }
  if (process.env.VERCEL) {
    // On Vercel without Upstash, refuse rather than pretending persistence works.
    throw new Error("mailbox_not_configured");
  }
  // Local: prefer file store so Vite + local API share state across processes.
  const fromFile = readFileEntry(key);
  if (fromFile !== null) return fromFile;
  return memoryGet(key);
}

async function storeSet(key, value, ttlSeconds) {
  if (hasUpstash()) {
    await upstashCommand(["SET", key, JSON.stringify(value), "EX", String(ttlSeconds)]);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("mailbox_not_configured");
  }
  writeFileEntry(key, value, ttlSeconds);
  memorySet(key, value, ttlSeconds);
}

async function storeDel(key) {
  if (hasUpstash()) {
    await upstashCommand(["DEL", key]);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("mailbox_not_configured");
  }
  deleteFileEntry(key);
  memoryDel(key);
}

/**
 * Upsert one encrypted answer blob. Server never opens ciphertext.
 */
export async function upsertBlob({
  trajectoryId,
  role,
  respondentId,
  ciphertext,
  iv,
  ttlSeconds = DEFAULT_TTL_SECONDS,
}) {
  const key = blobKey(trajectoryId, role, respondentId);
  const record = {
    trajectoryId,
    role,
    respondentId,
    ciphertext,
    iv,
    updatedAt: new Date().toISOString(),
  };
  await storeSet(key, record, ttlSeconds);

  const index = (await storeGet(indexKey(trajectoryId))) || { keys: [] };
  if (!index.keys.includes(key)) {
    index.keys.push(key);
    await storeSet(indexKey(trajectoryId), index, ttlSeconds);
  }
  return { ok: true, key };
}

export async function listBlobs(trajectoryId) {
  const index = (await storeGet(indexKey(trajectoryId))) || { keys: [] };
  const blobs = [];
  for (const key of index.keys) {
    const record = await storeGet(key);
    if (record) blobs.push(record);
  }
  return blobs;
}

export async function purgeTrajectory(trajectoryId) {
  const index = (await storeGet(indexKey(trajectoryId))) || { keys: [] };
  for (const key of index.keys) {
    await storeDel(key);
  }
  await storeDel(indexKey(trajectoryId));
  return { ok: true, purged: index.keys.length };
}

/** Test helper — clear in-memory + file entries for this process. */
export function __resetMailboxForTests() {
  memoryStore.clear();
  const dir = fileStorePath();
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir)) {
      fs.unlinkSync(path.join(dir, name));
    }
  }
}
