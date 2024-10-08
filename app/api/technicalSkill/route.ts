import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const params = new URLSearchParams(searchParams)
  const isProjectListInclude = params.get("projectListInclude")

  const technicalSkillList = await prisma.technicalSkill.findMany({
    include: { projectList: !!isProjectListInclude },
  })

  return Response.json(technicalSkillList || [], { status: 201 })
}
