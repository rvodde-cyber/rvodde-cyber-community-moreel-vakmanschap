import { isWorkshopHubEnabled } from "./lib/workshop-flags.js";
import {
  PREVIEW_COOKIE,
  PREVIEW_SESSION_HOURS,
  codeIsGeldig,
  createPreviewSessionToken,
  getEdgeConfigClient,
  haalActieveCodeOp,
  normaliseerCode,
  pathMatchtPreviewRoute,
  previewCookieHeader,
  verifyPreviewSessionToken,
} from "./lib/preview-code.js";

export const config = {
  matcher: [
    "/workshop",
    "/workshop/:path*",
    "/besloten",
    "/besloten/:path*",
    "/data/workshop/:path*",
    "/wisselwerking",
    "/wisselwerking/:path*",
  ],
};

/** Full HTML — no React/SPA dependency. Always readable, even if JS fails. */
function unavailableHtml() {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Binnenkort beschikbaar — Moral Craftsmanship</title>
  <style>
    :root {
      --teal: #1d9e75;
      --text: #04342c;
      --muted: #3d6b5f;
      --card: #ffffff;
      --border: rgba(4, 52, 44, 0.12);
      --bg: #f4fbf8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: "DM Sans", "Segoe UI", sans-serif;
      color: var(--text);
      background: linear-gradient(165deg, var(--bg) 0%, #e8f5f0 45%, #dff0ea 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      max-width: 440px;
      width: 100%;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 24px 64px rgba(4, 52, 44, 0.08);
    }
    .eyebrow {
      margin: 0 0 8px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--teal);
    }
    h1 {
      margin: 0 0 12px;
      font-size: 1.75rem;
      line-height: 1.25;
    }
    p {
      margin: 0 0 20px;
      color: var(--muted);
      line-height: 1.6;
    }
    a {
      color: var(--teal);
      font-weight: 600;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main class="card">
    <p class="eyebrow">Moral Craftsmanship</p>
    <h1>Binnenkort beschikbaar</h1>
    <p>
      Het besloten workshopgedeelte is tijdelijk niet beschikbaar.
      Het publieke platform kun je gewoon blijven gebruiken.
    </p>
    <p><a href="/welkom">← Terug naar het publieke platform</a></p>
  </main>
</body>
</html>`;
}

function isPublicWorkshopPath(pathname) {
  return (
    pathname === "/workshop" ||
    pathname === "/workshop/" ||
    pathname === "/workshop/voorproef" ||
    pathname === "/workshop/unavailable" ||
    pathname.startsWith("/workshop/unavailable/")
  );
}

async function allowPreviewIfValid(request, url) {
  const { pathname } = url;
  if (isPublicWorkshopPath(pathname) || pathname.startsWith("/data/workshop")) {
    return null;
  }

  let actief;
  try {
    const client = getEdgeConfigClient();
    if (!client) return null;
    actief = await haalActieveCodeOp(client);
  } catch {
    return null;
  }

  if (!actief.code || !codeIsGeldig(actief.verlooptOp)) return null;
  if (!pathMatchtPreviewRoute(pathname, actief.routes)) return null;

  const cookieToken = request.cookies.get(PREVIEW_COOKIE)?.value;
  const cookieOk = await verifyPreviewSessionToken(cookieToken, actief.code);
  if (cookieOk) {
    return fetch(request);
  }

  const aangeboden = normaliseerCode(url.searchParams.get("code"));
  if (!aangeboden || aangeboden !== actief.code) return null;

  const maxAgeSeconds = PREVIEW_SESSION_HOURS * 60 * 60;
  const expiresAtMs = Math.min(
    Date.now() + maxAgeSeconds * 1000,
    Number(actief.verlooptOp)
  );
  const token = await createPreviewSessionToken(actief.code, expiresAtMs);
  const redirectUrl = new URL(pathname, request.url);
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl.pathname,
      "Set-Cookie": previewCookieHeader(token, Math.max(1, Math.floor((expiresAtMs - Date.now()) / 1000))),
      "Cache-Control": "no-store",
    },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Preview-codes staan los van WORKSHOP_PASSWORD en werken ook als de hub-vlag uit staat.
  try {
    const previewResponse = await allowPreviewIfValid(request, url);
    if (previewResponse) return previewResponse;
  } catch {
    // Preview mag de bestaande workshop-gate nooit omverwerpen.
  }

  // Kill-switch (default off): serve static HTML immediately — no redirect, no SPA.
  if (!isWorkshopHubEnabled()) {
    if (pathname.startsWith("/data/workshop")) {
      return new Response(JSON.stringify({ error: "hub_disabled" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(unavailableHtml(), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  // Hub enabled: protect apps, besloten, and same-origin Wisselwerking;
  // keep login pages public.
  if (isPublicWorkshopPath(pathname) || pathname.startsWith("/data/workshop")) {
    return fetch(request);
  }

  // Session crypto is Edge-safe (Web Crypto only). Still wrapped so a
  // missing secret or import failure becomes a login redirect, not a 500.
  let session = null;
  try {
    const { COOKIE_NAME, verifySessionToken } = await import("./lib/workshop-session.js");
    const token = request.cookies.get(COOKIE_NAME)?.value;
    session = await verifySessionToken(token);
  } catch {
    session = null;
  }

  if (!session) {
    const loginUrl = new URL("/workshop", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return Response.redirect(loginUrl, 302);
  }

  return fetch(request);
}
