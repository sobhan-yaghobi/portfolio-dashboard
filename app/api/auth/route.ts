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
