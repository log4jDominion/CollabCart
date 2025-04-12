import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// Pages that don't require authentication
const publicPages = ["/", "/login", "/register", "/about", "/pricing", "/contact", "/terms", "/privacy"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the page is public
  if (publicPages.some((page) => pathname === page || pathname.startsWith(page + "/"))) {
    return NextResponse.next()
  }

  // Check if the user is authenticated
  const token = request.cookies.get("auth_token")?.value

  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify the token
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
    verify(token, JWT_SECRET)

    // Continue to the protected page
    return NextResponse.next()
  } catch (error) {
    // Token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Add a matcher for protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
}
