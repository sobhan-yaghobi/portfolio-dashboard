import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const socialMediaList = await prisma.socialMedia.findMany()

  return Response.json(socialMediaList || [], { status: 201 })
}
