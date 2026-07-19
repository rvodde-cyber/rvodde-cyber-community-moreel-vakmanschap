import { isWorkshopHubEnabled } from "./lib/workshop-flags.js";

export const config = {
  matcher: [
    "/workshop",
    "/workshop/:path*",
    "/besloten",
    "/besloten/:path*",
    "/data/workshop/:path*",
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

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

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

  // Hub enabled: protect apps/besloten; keep login pages public.
  const isPublicWorkshopPath =
    pathname === "/workshop" ||
    pathname === "/workshop/" ||
    pathname === "/workshop/voorproef" ||
    pathname === "/workshop/unavailable" ||
    pathname.startsWith("/workshop/unavailable/");

  if (isPublicWorkshopPath || pathname.startsWith("/data/workshop")) {
    return fetch(request);
  }

  // Lazy-load session crypto only when hub is on (avoids Edge issues while disabled).
  const { COOKIE_NAME, verifySessionToken } = await import("./lib/workshop-session.js");
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/workshop", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return Response.redirect(loginUrl, 302);
  }

  return fetch(request);
}
