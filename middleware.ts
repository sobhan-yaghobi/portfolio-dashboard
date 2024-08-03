import { refreshTokenHandler, verifyToken } from "@/auth/auth"
import { NextRequest, NextResponse } from "next/server"
import { encrypt } from "./auth/session"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("session")?.value
  const isTokenRefreshed = request.cookies.get("isTokenRefreshed")?.value

  if (token) {
    const verifyTokenResult = await verifyToken(token)
    if (!verifyTokenResult) redirectWhenTokenResultFailure(pathname, request)

    if (pathname === "/") return redirectToDashboard(request)

    if (pathname.startsWith("/login")) return redirectToDashboard(request)

    if (isTokenRefreshed) {
      return NextResponse.next()
    } else {
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
      const session = await encrypt({ id: verifyTokenResult, expiresAt })
      const response = NextResponse.next()

      response.cookies.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      })
      response.cookies.set("isTokenRefreshed", JSON.stringify(true), { httpOnly: true })

      return response
    }
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
