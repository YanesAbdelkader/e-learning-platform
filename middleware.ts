import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/mycourses"];
  const isLoggedIn = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  // Store last visited page in a cookie (track all pages)
  const res = NextResponse.next();
  res.cookies.set("lastVisitedPage", pathname, { path: "/" });

  // If user is not logged in and tries to access a protected route, store prevPage and redirect
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isLoggedIn
  ) {
    res.cookies.set("prevPage", pathname, { path: "/" }); // Store only if it's protected
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Ensure user is on the correct role-based dashboard path
  if (pathname.startsWith("/dashboard") && role) {
    const pathSegments = pathname.split("/");
    const currentRole = pathSegments[2];

    if (currentRole !== role) {
      const remainingPath = pathSegments.slice(3).join("/");
      const newUrl = `/dashboard/${role}${remainingPath ? `/${remainingPath}` : ""}`;
      return NextResponse.redirect(new URL(newUrl, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/:path*"], // Match all paths
};
