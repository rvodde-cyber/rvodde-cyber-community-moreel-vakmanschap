export const COOKIE_NAME = "workshop_session";
export const SESSION_HOURS = 8;

/**
 * Session signing secret — must be set via WORKSHOP_SESSION_SECRET.
 * No hardcoded fallback: missing secret is a hard failure.
 */
export function getSessionSecret() {
  const secret = process.env.WORKSHOP_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "WORKSHOP_SESSION_SECRET ontbreekt. Zet een sterk secret in Vercel Environment Variables vóórdat de Workshop Hub wordt ingeschakeld."
    );
  }
  return secret;
}

function encodeBase64Url(str) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf8").toString("base64url");
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(str) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64url").toString("utf8");
  }
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return new TextDecoder().decode(
    Uint8Array.from(atob(padded), (c) => c.charCodeAt(0))
  );
}

async function sign(data, secret) {
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

export async function createSessionToken(workshopNaam, expiresAtMs, options = {}) {
  const payload = JSON.stringify({
    exp: expiresAtMs,
    w: workshopNaam,
    p: options.preview ? 1 : 0,
  });
  const payloadB64 = encodeBase64Url(payload);
  const sig = await sign(payloadB64, getSessionSecret());
  return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token) return null;

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;

  let expected;
  try {
    expected = await sign(payloadB64, getSessionSecret());
  } catch {
    return null;
  }
  if (sig !== expected) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(payloadB64));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieHeader(token, maxAgeSeconds) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export function clearSessionCookieHeader() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function getTokenFromCookieHeader(cookieHeader = "") {
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

export async function getSessionFromRequest(req) {
  const token = getTokenFromCookieHeader(req.headers?.cookie || "");
  if (!token) return null;
  return verifySessionToken(token);
}
