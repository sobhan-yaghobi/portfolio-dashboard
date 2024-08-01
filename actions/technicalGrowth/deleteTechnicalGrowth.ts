"use server"

import { revalidatePath } from "next/cache"
import { isTechnicalGrowthExist } from "./technicalGrowthUtils"
import { deleteTechnicalGrowth } from "./technicalGrowthUtils"

import { TypeReturnSererAction } from "@/lib/types/utils.type"

export const deleteTechnicalGrowthFormAction = async (
  technicalGrowthId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const isTechnicalGrowthResult = await isTechnicalGrowthExist(technicalGrowthId)

  if (isTechnicalGrowthResult) return setDeleteSkill(technicalGrowthId, reValidPath)

  return { message: "Technical Growth not found", status: false }
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
