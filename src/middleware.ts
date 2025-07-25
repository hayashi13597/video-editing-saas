import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (
      req.nextauth.token &&
      (pathname === "/sign-in" || pathname.includes("/sign-up"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        const { pathname } = req.nextUrl;
        if (pathname === "/sign-in" || pathname.includes("/sign-up")) {
          return true;
        }

        // For dashboard and other protected routes, require token
        return !!token;
      }
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up/:path*"]
};
