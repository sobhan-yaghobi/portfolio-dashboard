import { verifyToken } from "@/auth/auth"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("session")?.value

  if (token) {
    const verifyTokenResult = await verifyToken(token)
    if (!verifyTokenResult) {
      if (!pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
      return null
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  } else {
    if (!pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return null
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}
