import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const projects = await prisma.project.findMany()

  return Response.json(projects || [], { status: 201 })
}
