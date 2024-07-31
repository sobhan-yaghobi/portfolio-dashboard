import { decrypt } from "@/auth/session"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const POST = async (request: NextRequest) => {
  const { id } = await request.json()
  if (id) {
    const admin = await prisma.admin.findUnique({ where: { id } })
    if (admin) {
      return NextResponse.json(true)
    }
  }
  return NextResponse.json(false)
}

export const GET = async (request: NextRequest) => {
  const authorizationValue = request.headers.get("Authorization")
  const token = authorizationValue?.split(" ").at(-1)

  const sessionResult = await decrypt(token)

  if (!sessionResult || !("id" in sessionResult) || typeof sessionResult?.id !== "string")
    return NextResponse.json(false)

  const { id } = sessionResult
  const adminInfo = await prisma.admin.findUnique({ where: { id } })

  return NextResponse.json(adminInfo?.id || false)
}
