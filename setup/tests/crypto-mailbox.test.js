import { describe, expect, it, beforeEach } from "vitest";
import {
  createTrajectory,
  decryptPayload,
  encryptPayload,
  exportKeyToBase64Url,
  generateTrajectoryKey,
  importKeyFromBase64Url,
  parseSetupFragment,
  buildSetupLink,
  ROLES,
} from "../src/lib/crypto.js";
import {
  __resetMailboxForTests,
  listBlobs,
  purgeTrajectory,
  upsertBlob,
} from "../../lib/setup-mailbox.js";

describe("setup crypto", () => {
  it("round-trips AES-GCM payloads", async () => {
    const key = await generateTrajectoryKey();
    const payload = { section: "chassis", itemId: "s1", value: 4 };
    const sealed = await encryptPayload(key, payload);
    expect(sealed.ciphertext).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(sealed.iv).toMatch(/^[A-Za-z0-9_-]+$/);
    const opened = await decryptPayload(key, sealed.ciphertext, sealed.iv);
    expect(opened).toEqual(payload);
  });

  it("exports and re-imports the key via base64url", async () => {
    const key = await generateTrajectoryKey();
    const encoded = await exportKeyToBase64Url(key);
    const restored = await importKeyFromBase64Url(encoded);
    const sealed = await encryptPayload(key, { ok: true });
    const opened = await decryptPayload(restored, sealed.ciphertext, sealed.iv);
    expect(opened).toEqual({ ok: true });
  });

  it("puts the key only in the URL fragment", async () => {
    const trajectory = await createTrajectory({
      origin: "https://example.test",
      basePath: "/setup/",
    });
    expect(trajectory.links.team).toContain("https://example.test/setup/#");
    expect(trajectory.links.team).toContain("k=");
    expect(trajectory.links.team).toContain(`t=${trajectory.trajectoryId}`);
    expect(trajectory.links.team).toContain(`r=${ROLES.team}`);

    const beforeHash = trajectory.links.team.split("#")[0];
    expect(beforeHash).not.toContain(trajectory.keyBase64Url);

    const parsed = parseSetupFragment(trajectory.links.advisor.split("#")[1]);
    expect(parsed.role).toBe(ROLES.advisor);
    expect(parsed.keyBase64Url).toBe(trajectory.keyBase64Url);
  });

  it("buildSetupLink keeps secrets behind #", () => {
    const link = buildSetupLink({
      origin: "https://hub.test",
      basePath: "/setup",
      trajectoryId: "abc",
      keyBase64Url: "SECRETKEY",
      role: "team",
      sessionId: "sess1",
    });
    expect(link.startsWith("https://hub.test/setup/#")).toBe(true);
    expect(link.includes("SECRETKEY")).toBe(true);
    expect(link.split("#")[0].includes("SECRETKEY")).toBe(false);
  });
});

describe("setup mailbox", () => {
  beforeEach(() => {
    __resetMailboxForTests();
    delete process.env.VERCEL;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it("stores and lists opaque blobs without inspecting them", async () => {
    await upsertBlob({
      trajectoryId: "traj-1",
      role: "team",
      respondentId: "r1",
      ciphertext: "cipherAAA",
      iv: "ivBBB",
    });
    await upsertBlob({
      trajectoryId: "traj-1",
      role: "leader",
      respondentId: "r2",
      ciphertext: "cipherCCC",
      iv: "ivDDD",
    });

    const blobs = await listBlobs("traj-1");
    expect(blobs).toHaveLength(2);
    expect(blobs.every((b) => b.ciphertext && b.iv)).toBe(true);
    expect(blobs.map((b) => b.role).sort()).toEqual(["leader", "team"]);
  });

  it("upserts by respondent id", async () => {
    await upsertBlob({
      trajectoryId: "traj-2",
      role: "team",
      respondentId: "same",
      ciphertext: "one",
      iv: "iv1",
    });
    await upsertBlob({
      trajectoryId: "traj-2",
      role: "team",
      respondentId: "same",
      ciphertext: "two",
      iv: "iv2",
    });
    const blobs = await listBlobs("traj-2");
    expect(blobs).toHaveLength(1);
    expect(blobs[0].ciphertext).toBe("two");
  });

  it("purges a trajectory", async () => {
    await upsertBlob({
      trajectoryId: "traj-3",
      role: "team",
      respondentId: "r1",
      ciphertext: "x",
      iv: "y",
    });
    const result = await purgeTrajectory("traj-3");
    expect(result.purged).toBe(1);
    expect(await listBlobs("traj-3")).toEqual([]);
  });
});
