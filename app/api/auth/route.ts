import prisma from "@/lib/prisma"
import { decrypt } from "@/auth/serverFunctions"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: NextRequest) => {
  const authorizationValue = request.headers.get("Authorization")
  const token = authorizationValue?.split(" ").at(-1)

  const sessionResult = await decrypt(token)

  if (!sessionResult || !("id" in sessionResult) || typeof sessionResult?.id !== "string")
    return NextResponse.json(false)

  const { id } = sessionResult
  const adminInfo = await prisma.admin.findUnique({ where: { id } })

  if (!adminInfo) return NextResponse.json(false)

  return NextResponse.json(adminInfo.id)
}
