import { timingSafeEqual } from "node:crypto";

/**
 * Fail closed: an unset or empty ADMIN_SECRET must never authenticate,
 * including the empty-vs-empty case (`"" === ""`).
 */
export function getAdminSecret() {
  return typeof process.env.ADMIN_SECRET === "string" ? process.env.ADMIN_SECRET.trim() : "";
}

export function adminSecretIsConfigured() {
  return getAdminSecret().length > 0;
}

function asSingleHeader(value) {
  return typeof value === "string" ? value : "";
}

export function adminSecretOk(provided) {
  const expected = getAdminSecret();
  if (!expected) return false;

  const given = asSingleHeader(provided);
  if (!given) return false;

  const expectedBuf = Buffer.from(expected, "utf8");
  const givenBuf = Buffer.from(given, "utf8");
  if (expectedBuf.length !== givenBuf.length) return false;
  return timingSafeEqual(expectedBuf, givenBuf);
}
