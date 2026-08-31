import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { adminSecretIsConfigured, adminSecretOk, authorizeAdminRequest, getAdminSecret } from "./admin-secret.js";

const ORIGINAL = process.env.ADMIN_SECRET;

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.ADMIN_SECRET;
  else process.env.ADMIN_SECRET = ORIGINAL;
});

describe("admin-secret fail closed", () => {
  it("weigert elk verzoek als ADMIN_SECRET ontbreekt", () => {
    delete process.env.ADMIN_SECRET;
    assert.equal(adminSecretIsConfigured(), false);
    assert.equal(getAdminSecret(), "");
    assert.equal(adminSecretOk("willekeurig"), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk(undefined), false);
    assert.deepEqual(authorizeAdminRequest("willekeurig"), {
      ok: false,
      status: 503,
      error: "admin_secret_niet_geconfigureerd",
    });
  });

  it("weigert elk verzoek als ADMIN_SECRET leeg of alleen whitespace is", () => {
    process.env.ADMIN_SECRET = "   ";
    assert.equal(adminSecretIsConfigured(), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk("   "), false);
    assert.equal(adminSecretOk("secret"), false);
    assert.equal(authorizeAdminRequest("secret").status, 503);
  });

  it("weigert een ontbrekende of niet-string header", () => {
    process.env.ADMIN_SECRET = "supergeheim";
    assert.equal(adminSecretOk(undefined), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk(["supergeheim"]), false);
    assert.equal(adminSecretOk(null), false);
    assert.deepEqual(authorizeAdminRequest(""), {
      ok: false,
      status: 401,
      error: "Ongeldig admin-secret",
    });
  });

  it("weigert een onjuist secret, ook bij andere lengte", () => {
    process.env.ADMIN_SECRET = "supergeheim";
    assert.equal(adminSecretOk("andergeheim"), false);
    assert.equal(adminSecretOk("kort"), false);
    assert.equal(adminSecretOk("supergeheim!"), false);
    assert.equal(authorizeAdminRequest("andergeheim").status, 401);
  });

  it("accepteert alleen het exacte geconfigureerde secret", () => {
    process.env.ADMIN_SECRET = "  supergeheim  ";
    assert.equal(adminSecretIsConfigured(), true);
    assert.equal(getAdminSecret(), "supergeheim");
    assert.equal(adminSecretOk("supergeheim"), true);
    assert.equal(adminSecretOk("  supergeheim  "), false);
    assert.deepEqual(authorizeAdminRequest("supergeheim"), { ok: true, status: 200 });
  });
});
