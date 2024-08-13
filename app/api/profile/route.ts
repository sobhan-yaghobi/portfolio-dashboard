import prisma from "@/lib/prisma"
import { AdminProfileInput } from "@/lib/types/profile.type"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const profileInfo = await prisma.admin.findFirst({ select: AdminProfileInput })
  return NextResponse.json(profileInfo)
}
