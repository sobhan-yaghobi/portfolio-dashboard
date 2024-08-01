import { verifyToken } from "@/auth/auth"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("session")?.value

  if (token) {
    const verifyTokenResult = await verifyToken(token)
    if (!verifyTokenResult) redirectWhenTokenResultFailure(pathname, request)

    if (pathname === "/") return redirectToDashboard(request)

    if (pathname.startsWith("/login")) return redirectToDashboard(request)

    return NextResponse.next()
  } else {
    if (!pathname.startsWith("/login")) return redirectToLogin(request)

    return null
  }
}

const redirectToLogin = (request: NextRequest) =>
  NextResponse.redirect(new URL("/login", request.url))

const redirectToDashboard = (request: NextRequest) =>
  NextResponse.redirect(new URL("/dashboard", request.url))

const redirectWhenTokenResultFailure = (pathname: string, request: NextRequest) => {
  if (!pathname.startsWith("/login")) return redirectToLogin(request)

  return null
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}
