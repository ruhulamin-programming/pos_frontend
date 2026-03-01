import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Define roles
const ROLE_ADMIN = "ADMIN";
const ROLE_CASHIER = "CASHIER";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // 1. If user is trying to access auth pages (login)
  if (pathname === "/" || pathname.startsWith("/register")) {
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        const role = decoded?.role;

        if (role === ROLE_ADMIN) {
          return NextResponse.redirect(new URL("/admin/overview", request.url));
        } else if (role === ROLE_CASHIER) {
          return NextResponse.redirect(new URL("/cashier", request.url));
        }
      } catch (error) {
        // If token is invalid, let them stay on login page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2. Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const decoded: any = jwtDecode(accessToken);
      if (decoded?.role !== ROLE_ADMIN) {
        // Unauthorized access to admin, redirect to respective dashboard or home
        return NextResponse.redirect(
          new URL(
            decoded?.role === ROLE_CASHIER ? "/cashier" : "/",
            request.url,
          ),
        );
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 3. Protect Cashier routes
  if (pathname.startsWith("/cashier")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const decoded: any = jwtDecode(accessToken);

      // If user is ADMIN, redirect to admin dashboard (preventing cashier access)
      if (decoded?.role === ROLE_ADMIN) {
        return NextResponse.redirect(new URL("/admin/overview", request.url));
      }

      // If user is not CASHIER, redirect to home/login
      if (decoded?.role !== ROLE_CASHIER) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
