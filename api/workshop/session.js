import { getSessionFromRequest } from "../../lib/workshop-session.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ authenticated: false });
    return;
  }

  const session = await getSessionFromRequest(req);
  if (!session) {
    res.status(200).json({ authenticated: false });
    return;
  }

  res.status(200).json({
    authenticated: true,
    workshop_naam: session.w,
    expires_at: session.exp,
  });
}
