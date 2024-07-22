import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./auth/session"

export default async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname
  // const cookie = request.cookies.get("session")?.value
  // const sessionResult = await decrypt(cookie)

  // if (!pathname.startsWith("/login")) {
  //   const getMeResult = await fetch("/api/auth", {
  //     body: JSON.stringify((sessionResult && sessionResult.id) || ""),
  //   })

  //   if (getMeResult) {
  //     return NextResponse.next()
  //   } else {
  //     return NextResponse.redirect(new URL("/login", request.url))
  //   }
  // } else {
  //   if (sessionResult) {
  //     return NextResponse.redirect(new URL("/", request.url))
  //   }
  return NextResponse.next()
  // }
}
