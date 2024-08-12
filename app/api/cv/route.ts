import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
  const technicalSkillList = await prisma.technicalSkill.findMany()
  const softSkillList = await prisma.softSkill.findMany()
  const projectList = await prisma.project.findMany({ include: { technicalSkillList: true } })

  return NextResponse.json({
    technicalSkillList,
    softSkillList,
    projectList,
  })
}
