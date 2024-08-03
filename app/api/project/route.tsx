import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const projectList = await prisma.project.findMany()

  return Response.json(projectList || [], { status: 201 })
}
