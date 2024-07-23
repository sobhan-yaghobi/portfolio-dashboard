import { verifyToken } from "@/auth/auth"
import { decrypt } from "@/auth/session"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.cookies.get("session")?.value
  const sessionResult = await decrypt(cookie)

  if (sessionResult && "id" in sessionResult && typeof sessionResult.id === "string") {
    const verifyTokenResult = await verifyToken(sessionResult.id)
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
