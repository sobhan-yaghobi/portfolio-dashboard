import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
  const technicalSkillList = await prisma.technicalSkill.findMany()
  const softSkillList = await prisma.technicalSkill.findMany()
  const projectList = await prisma.technicalSkill.findMany()

  return NextResponse.json({
    technicalSkillList,
    softSkillList,
    projectList,
  })
}
