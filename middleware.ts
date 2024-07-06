import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./lib/session"

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const cookie = request.cookies.get("session")?.value
  const sessionResult = await decrypt(cookie)

  if (!pathname.startsWith("/login")) {
    if (sessionResult && "id" in sessionResult) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } else {
    if (sessionResult) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }
}
