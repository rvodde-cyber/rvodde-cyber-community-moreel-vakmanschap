import { COOKIE_NAME, verifySessionToken } from "./lib/workshop-session.js";

export const config = {
  matcher: ["/workshop/apps", "/workshop/apps/:path*", "/besloten", "/besloten/:path*"],
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const loginUrl = new URL("/workshop", request.url);
    loginUrl.searchParams.set("redirect", url.pathname);
    return Response.redirect(loginUrl);
  }

  return;
}
