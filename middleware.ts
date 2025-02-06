import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/mycourses"];

  const isloggedin = req.cookies.get("token"); //change it with func

  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !isloggedin
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/mycourses/:path*"],
};
