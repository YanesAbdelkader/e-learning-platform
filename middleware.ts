import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/mycourses"];
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Store last visited page in a cookie
  const res = NextResponse.next();
  res.cookies.set("lastVisitedPage", pathname, { path: "/" });

  if (!token) {
    // Redirect if trying to access protected routes while not logged in
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      res.cookies.set("prevPage", pathname, { path: "/" });
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
  }

  // Check if user data is already cached in cookies
  const cachedUserData = req.cookies.get("userData")?.value;
  let role: string | undefined;
  let isVerified: boolean | undefined;

  if (cachedUserData) {
    // Use cached data
    try {
      const { role: cachedRole, verify: cachedVerify } = JSON.parse(cachedUserData);
      role = cachedRole;
      isVerified = cachedVerify;
    } catch (error) {
      console.error("Error parsing cached user data:", error);
    }
  }

  // Fetch user data from API if not cached
  if (!role || isVerified === undefined) {
    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-user-data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!apiRes.ok) {
        console.error("Failed to fetch user data:", apiRes.status);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { data } = await apiRes.json();
      role = data?.role;

      // For teachers, check the `teacher_info.verified` field
      if (role === "teacher") {
        isVerified = data?.teacher_info?.verified;
      } else {
        isVerified = true; // Assume non-teachers are verified
      }

      if (!role) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Cache user data in a cookie with an expiry (e.g., 1 hour)
      res.cookies.set("userData", JSON.stringify({ role, verify: isVerified }), {
        path: "/",
        maxAge: 60,
      });
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Check if the user is a teacher and not verified
  if (role === "teacher" && !isVerified && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/not-verified", req.url));
  }

  // Ensure user is on the correct role-based dashboard path
  if (pathname.startsWith("/dashboard")) {
    const pathSegments = pathname.split("/");
    const currentRole = pathSegments[2];

    if (currentRole !== role) {
      const remainingPath = pathSegments.slice(3).join("/");
      const newUrl = `/dashboard/${role}${
        remainingPath ? `/${remainingPath}` : ""
      }`;
      return NextResponse.redirect(new URL(newUrl, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/mycourses/:path*"], // Match all paths
};