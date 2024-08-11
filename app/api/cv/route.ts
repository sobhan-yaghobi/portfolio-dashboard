import prisma from "@/lib/prisma"
import { AdminProfileInput } from "@/lib/types/profile.type"
import { NextResponse } from "next/server"

export const GET = async () => {
  const profileInfo = await prisma.admin.findFirst({ select: AdminProfileInput })
  const technicalSkillList = await prisma.technicalSkill.findMany()
  const softSkillList = await prisma.technicalSkill.findMany()
  const projectList = await prisma.technicalSkill.findMany()

  return NextResponse.json({
    personal: profileInfo,
    technicalSkillList,
    softSkillList,
    projectList,
  })
}
