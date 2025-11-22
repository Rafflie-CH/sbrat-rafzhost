import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("sb-access-token")?.value;

  // halaman yg butuh login
  const protectedPaths = ["/", "/profile", "/notif", "/dm"];

  if (!token && protectedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
