/**
 * Client-side end-to-end crypto for Setup.
 *
 * The AES-GCM key lives only in the URL fragment (#…) and in memory.
 * Fragments are never sent to a server by browsers — that is the privacy guarantee.
 */

const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function randomId(byteLength = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return bytesToBase64Url(bytes);
}

export async function generateTrajectoryKey() {
  return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);
}

export async function exportKeyToBase64Url(key) {
  const raw = await crypto.subtle.exportKey("raw", key);
  return bytesToBase64Url(new Uint8Array(raw));
}

export async function importKeyFromBase64Url(encoded) {
  const raw = base64UrlToBytes(encoded);
  return crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, true, [
    "encrypt",
    "decrypt",
  ]);
}

/**
 * Encrypt a JSON-serialisable payload. Returns base64url ciphertext + iv.
 * The server stores only these opaque strings.
 */
export async function encryptPayload(key, payload) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = TEXT_ENCODER.encode(JSON.stringify(payload));
  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return {
    ciphertext: bytesToBase64Url(new Uint8Array(cipherBuffer)),
    iv: bytesToBase64Url(iv),
  };
}

export async function decryptPayload(key, ciphertext, iv) {
  const cipherBytes = base64UrlToBytes(ciphertext);
  const ivBytes = base64UrlToBytes(iv);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    cipherBytes
  );
  return JSON.parse(TEXT_DECODER.decode(plainBuffer));
}

export const ROLES = {
  advisor: "advisor",
  team: "team",
  leader: "leader",
};

/**
 * Build a Setup link. Everything after # stays client-side.
 * Format: {origin}{basePath}#t={trajectoryId}&k={key}&r={role}&s={sessionId}
 */
export function buildSetupLink({
  origin,
  basePath = "/",
  trajectoryId,
  keyBase64Url,
  role,
  sessionId,
}) {
  const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const params = new URLSearchParams();
  params.set("t", trajectoryId);
  params.set("k", keyBase64Url);
  params.set("r", role);
  if (sessionId) params.set("s", sessionId);
  // URLSearchParams encodes; fragment keys stay compact enough for sharing.
  return `${origin}${base}#${params.toString()}`;
}

export function parseSetupFragment(hash = "") {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const trajectoryId = params.get("t");
  const keyBase64Url = params.get("k");
  const role = params.get("r");
  const sessionId = params.get("s");
  if (!trajectoryId || !keyBase64Url || !role) return null;
  return { trajectoryId, keyBase64Url, role, sessionId: sessionId || null };
}

/**
 * Create a new trajectory entirely in the browser.
 * Losing these links means permanent loss of access — intentional E2E trade-off.
 */
export async function createTrajectory({ origin, basePath = "/" } = {}) {
  const trajectoryId = randomId(18);
  const key = await generateTrajectoryKey();
  const keyBase64Url = await exportKeyToBase64Url(key);
  const teamSessionId = randomId(12);
  const leaderSessionId = randomId(12);

  const resolvedOrigin =
    origin || (typeof window !== "undefined" ? window.location.origin : "http://localhost");
  const resolvedBase =
    basePath ||
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) ||
    "/";

  return {
    trajectoryId,
    key,
    keyBase64Url,
    links: {
      advisor: buildSetupLink({
        origin: resolvedOrigin,
        basePath: resolvedBase,
        trajectoryId,
        keyBase64Url,
        role: ROLES.advisor,
      }),
      team: buildSetupLink({
        origin: resolvedOrigin,
        basePath: resolvedBase,
        trajectoryId,
        keyBase64Url,
        role: ROLES.team,
        sessionId: teamSessionId,
      }),
      leader: buildSetupLink({
        origin: resolvedOrigin,
        basePath: resolvedBase,
        trajectoryId,
        keyBase64Url,
        role: ROLES.leader,
        sessionId: leaderSessionId,
      }),
    },
  };
}

export { bytesToBase64Url, base64UrlToBytes, randomId };
