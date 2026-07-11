import { clearSessionCookieHeader } from "../../lib/workshop-session.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.setHeader("Set-Cookie", clearSessionCookieHeader());
  res.status(200).json({ ok: true });
}
