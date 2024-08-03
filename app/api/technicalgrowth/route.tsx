import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const technicalGrowthList = await prisma.technicalGrowth.findMany({ orderBy: { order: "asc" } })

  return Response.json(technicalGrowthList || [], { status: 201 })
}
