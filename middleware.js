import { isWorkshopHubEnabled } from "./lib/workshop-flags.js";
import { COOKIE_NAME, verifySessionToken } from "./lib/workshop-session.js";

export const config = {
  matcher: [
    "/workshop",
    "/workshop/:path*",
    "/besloten",
    "/besloten/:path*",
    "/data/workshop/:path*",
  ],
};

function unavailableUrl(request) {
  return new URL("/workshop/unavailable", request.url);
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Explicit kill-switch — default off. No session crypto needed while disabled.
  if (!isWorkshopHubEnabled()) {
    if (pathname === "/workshop/unavailable") {
      return fetch(request);
    }
    if (pathname.startsWith("/data/workshop")) {
      return new Response(JSON.stringify({ error: "hub_disabled" }), {
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }
    return Response.redirect(unavailableUrl(request), 302);
  }

  // Hub enabled: keep login + unavailable pages public; protect apps/besloten.
  const isPublicWorkshopPath =
    pathname === "/workshop" ||
    pathname === "/workshop/" ||
    pathname === "/workshop/voorproef" ||
    pathname === "/workshop/unavailable" ||
    pathname.startsWith("/workshop/unavailable/");

  if (isPublicWorkshopPath || pathname.startsWith("/data/workshop")) {
    return fetch(request);
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/workshop", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return Response.redirect(loginUrl, 302);
  }

  return fetch(request);
}
