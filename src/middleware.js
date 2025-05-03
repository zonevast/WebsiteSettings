import { NextResponse } from "next/server";

export function middleware(request) {
  try {
    const access = request.cookies.get("access");
    const refresh = request.cookies.get("refresh");
    const pathname = request.nextUrl.pathname;

    // Env-driven settings
    const authRedirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;
    const myAppUrl = process.env.NEXT_PUBLIC_MY_APP_URL;
    const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost";

    // Define protected paths
    const protectedPaths = [
      /^\/home\/?/,
      /^\/settings\/?/
    ];
    const isProtected = protectedPaths.some((pattern) => pattern.test(pathname));
    const isLogoutPath = pathname === "/logout";

    // Handle logout
    if (isLogoutPath) {
      const url = new URL(authRedirectUrl);
      url.searchParams.set("from", myAppUrl);
      const response = NextResponse.redirect(url.toString());

      // Clear cookies using env-driven domain
      response.cookies.delete("access", {
        domain: cookieDomain,
        path: "/",
      });
      response.cookies.delete("refresh", {
        domain: cookieDomain,
        path: "/",
      });

      return response;
    }

    // If accessing protected route and only have refresh → trigger refresh
    if (!access && refresh && isProtected) {
      const refreshUrl = new URL("/api/refresh", myAppUrl);
      return NextResponse.redirect(refreshUrl);
    }

    // If truly unauthenticated → send to login
    if (!access && !refresh && isProtected) {
      const url = new URL(authRedirectUrl);
      url.searchParams.set("from", myAppUrl);
      return NextResponse.redirect(url.toString());
    }

    // Otherwise, continue
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // everything except API, static assets, images, favicon, css/js, etc.
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
