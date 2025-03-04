import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/mycourses"];
  const isLoggedIn = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value; // Get user role from cookies

  // Redirect to login if accessing a protected route without a token
  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If accessing "/dashboard" directly, redirect to "/dashboard/{role}"
  if (req.nextUrl.pathname === "/dashboard" && role) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
  }

  return NextResponse.next(); // Proceed to the requested route
}

// Middleware will only apply to dashboard and mycourses routes
export const config = {
  matcher: ["/dashboard/:path*", "/mycourses/:path*"],
};
