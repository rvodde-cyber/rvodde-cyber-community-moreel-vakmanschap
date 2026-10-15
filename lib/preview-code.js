import { createClient } from "@vercel/edge-config";

const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // geen 0/O/1/I, voorkomt verwarring bij overtypen

export const PREVIEW_COOKIE = "preview_session";
export const PREVIEW_SESSION_HOURS = 48;

export const PREVIEW_ROUTE_OPTIES = [
  { value: "/wisselwerking", label: "Wisselwerking" },
  { value: "/frisse-organisatie", label: "De Frisse Organisatie" },
];

export function genereerCode(lengte = 6) {
  let code = "";
  for (let i = 0; i < lengte; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function normaliseerCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

export function codeIsGeldig(verlooptOp) {
  if (!verlooptOp) return false;
  return Date.now() < Number(verlooptOp);
}

export function pathMatchtPreviewRoute(pathname, routes) {
  return (routes || []).some((route) => {
    const base = String(route || "").replace(/\/+$/, "") || "/";
    return pathname === base || pathname === `${base}/` || pathname.startsWith(`${base}/`);
  });
}

export function getEdgeConfigClient() {
  const connection = process.env.EDGE_CONFIG?.trim();
  if (!connection) return null;
  try {
    return createClient(connection);
  } catch {
    return null;
  }
}

export async function haalActieveCodeOp(edgeConfigClient) {
  if (!edgeConfigClient) {
    return { code: null, verlooptOp: null, routes: [] };
  }
  const [code, verlooptOp, routes] = await Promise.all([
    edgeConfigClient.get("previewCode"),
    edgeConfigClient.get("previewCodeVerlooptOp"),
    edgeConfigClient.get("previewRoutes"),
  ]);
  return {
    code: code ? normaliseerCode(code) : null,
    verlooptOp: verlooptOp == null ? null : Number(verlooptOp),
    routes: Array.isArray(routes) ? routes : [],
  };
}

function encodeBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(str) {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

async function hmacHex(data, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createPreviewSessionToken(code, expiresAtMs) {
  const payloadB64 = encodeBase64Url(JSON.stringify({ exp: expiresAtMs, c: normaliseerCode(code) }));
  const sig = await hmacHex(payloadB64, normaliseerCode(code));
  return `${payloadB64}.${sig}`;
}

export async function verifyPreviewSessionToken(token, currentCode) {
  if (!token || !currentCode) return null;
  const [payloadB64, sig] = String(token).split(".");
  if (!payloadB64 || !sig) return null;

  const expected = await hmacHex(payloadB64, normaliseerCode(currentCode));
  if (sig !== expected) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(payloadB64));
    if (normaliseerCode(payload.c) !== normaliseerCode(currentCode)) return null;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function previewCookieHeader(token, maxAgeSeconds) {
  return `${PREVIEW_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}
