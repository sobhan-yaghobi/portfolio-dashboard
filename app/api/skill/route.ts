import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const params = new URLSearchParams(searchParams)
  const isProjectListInclude = params.get("projectListInclude")

  const skillList = await prisma.skill.findMany({
    include: { projectList: !!isProjectListInclude },
  })

  return Response.json(skillList || [], { status: 201 })
}
