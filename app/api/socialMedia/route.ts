import prisma from "@/lib/prisma"

export const GET = async () => {
  const socialMediaList = await prisma.socialMedia.findMany()

  return Response.json(socialMediaList || [], { status: 201 })
}
