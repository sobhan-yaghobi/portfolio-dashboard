import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const params = new URLSearchParams(searchParams)
  const isTechnicalSkillListInclude = params.get("technicalSkillListInclude")

  const projectList = await prisma.project.findMany({
    include: { technicalSkillList: !!isTechnicalSkillListInclude },
  })

  return Response.json(projectList || [], { status: 201 })
}
