"use server"

import { revalidatePath } from "next/cache"

import { TypeReturnSererAction } from "@/lib/definition"
import { isTechnicalGrowthExist } from "./technicalGrowthUtils"
import { deleteTechnicalGrowth } from "./technicalGrowthUtils"

export const deleteTechnicalGrowthFormAction = async (
  technicalGrowthId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const isTechnicalGrowthResult = await isTechnicalGrowthExist(technicalGrowthId)

  if (isTechnicalGrowthResult) return setDeleteSkill(technicalGrowthId, reValidPath)

  return { message: "Project remove got failure", status: false }
}

const setDeleteSkill = async (
  technicalGrowthId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteTechnicalGrowthResult = await deleteTechnicalGrowth(technicalGrowthId)

  if (deleteTechnicalGrowthResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Technical Growth remove successfully" }
  }

  return { message: "Remove Technical Growth got failure", status: false }
}
