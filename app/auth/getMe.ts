import prisma from "@/lib/prisma"
import { verifySession } from "@/lib/session"
import { cache } from "react"

export const getMe = cache(async () => {
  const session = await verifySession()
  if (session && "id" in session) {
    const admin = await prisma.admin.findUnique({
      where: { id: session?.id.toString() },
      select: { id: true },
    })

    if (admin) {
      return admin
    }
  }
})
