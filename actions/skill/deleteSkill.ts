"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

import { TypeReturnSererAction } from "@/lib/definition"

export const deleteSkillFormAction = async (
  id: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteResult = await prisma.skills.delete({ where: { id } })

  if (deleteResult) {
    revalidatePath(reValidPath)
    return { message: "Project removed successfully", status: true }
  }
  return { message: "Project remove got failure", status: false }
}
