import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;
  // Check if the user is authenticated
  const isAuthenticated = request.cookies.get("token");

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Redirect freelancers trying to access client or admin areas
  if (role === "freelancer" && pathname.startsWith("/home/clients/dashboard")) {
    return NextResponse.redirect(new URL("/home/freelancers/find-work", request.url));
  }

  if (role === "freelancer" && pathname.startsWith("/home/admin")) {
    return NextResponse.redirect(new URL("/home/freelancers/find-work", request.url));
  }

  // Redirect clients trying to access freelancer or admin areas
  if (role === "client" && pathname.startsWith("/home/freelancers")) {
    return NextResponse.redirect(new URL("/home/clients/dashboard", request.url));
  }

  if (role === "client" && pathname.startsWith("/home/admin")) {
    return NextResponse.redirect(new URL("/home/clients/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/clients/:path*",
    "/home/freelancers/:path*",
    "/home/admin/:path*",
  ],
};
