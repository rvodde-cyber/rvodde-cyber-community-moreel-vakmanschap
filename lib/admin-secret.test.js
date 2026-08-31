import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { adminSecretIsConfigured, adminSecretOk, getAdminSecret } from "./admin-secret.js";

const ORIGINAL = process.env.ADMIN_SECRET;

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.ADMIN_SECRET;
  else process.env.ADMIN_SECRET = ORIGINAL;
});

describe("admin-secret fail closed", () => {
  it("weigerd elk verzoek als ADMIN_SECRET ontbreekt", () => {
    delete process.env.ADMIN_SECRET;
    assert.equal(adminSecretIsConfigured(), false);
    assert.equal(getAdminSecret(), "");
    assert.equal(adminSecretOk("willekeurig"), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk(undefined), false);
  });

  it("weigerd elk verzoek als ADMIN_SECRET leeg of alleen whitespace is", () => {
    process.env.ADMIN_SECRET = "   ";
    assert.equal(adminSecretIsConfigured(), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk("   "), false);
    assert.equal(adminSecretOk("secret"), false);
  });

  it("weigerd een ontbrekende of niet-string header", () => {
    process.env.ADMIN_SECRET = "supergeheim";
    assert.equal(adminSecretOk(undefined), false);
    assert.equal(adminSecretOk(""), false);
    assert.equal(adminSecretOk(["supergeheim"]), false);
    assert.equal(adminSecretOk(null), false);
  });

  it("weigerd een onjuist secret, ook bij andere lengte", () => {
    process.env.ADMIN_SECRET = "supergeheim";
    assert.equal(adminSecretOk("andergeheim"), false);
    assert.equal(adminSecretOk("kort"), false);
    assert.equal(adminSecretOk("supergeheim!"), false);
  });

  it("accepteert alleen het exacte geconfigureerde secret", () => {
    process.env.ADMIN_SECRET = "  supergeheim  ";
    assert.equal(adminSecretIsConfigured(), true);
    assert.equal(getAdminSecret(), "supergeheim");
    assert.equal(adminSecretOk("supergeheim"), true);
    assert.equal(adminSecretOk("  supergeheim  "), false);
  });
});
