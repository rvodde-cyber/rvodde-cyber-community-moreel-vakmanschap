/**
 * Thin client for the blind Setup mailbox API.
 * The server only ever sees ciphertext — never plaintext answers.
 */

const API_BASE = "/api/setup";

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "request_failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function submitEncryptedAnswer({
  trajectoryId,
  role,
  respondentId,
  ciphertext,
  iv,
}) {
  const response = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trajectoryId, role, respondentId, ciphertext, iv }),
  });
  return readJson(response);
}

export async function fetchEncryptedBlobs(trajectoryId) {
  const response = await fetch(
    `${API_BASE}/fetch?trajectoryId=${encodeURIComponent(trajectoryId)}`
  );
  return readJson(response);
}

export async function purgeTrajectory(trajectoryId) {
  const response = await fetch(`${API_BASE}/purge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trajectoryId }),
  });
  return readJson(response);
}
