import { verifyToken } from "@/auth/clientFunctions"
import { NextRequest, NextResponse } from "next/server"
import { createToken } from "./auth/serverFunctions"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value
  const isTokenRefreshed = request.cookies.get("isTokenRefreshed")?.value

  if (token) {
    const verifyTokenResult = await verifyToken(token)
    if (!verifyTokenResult) redirectWhenTokenResultFailure(pathname, request)

    if (pathname === "/") return redirectToDashboard(request)

    if (pathname.startsWith("/login")) return redirectToDashboard(request)

    if (isTokenRefreshed) {
      return NextResponse.next()
    } else {
      return setRefreshToken(verifyTokenResult)
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

const setRefreshToken = async (adminId: string) => {
  const response = NextResponse.next()
  const { token, expiresAt } = await createToken(adminId)

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
  response.cookies.set("isTokenRefreshed", JSON.stringify(true), { httpOnly: true })

  return response
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}
