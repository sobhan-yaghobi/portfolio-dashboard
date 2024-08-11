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

  if (isTechnicalGrowthResult) return setDeleteTechnicalSkill(technicalGrowthId, reValidPath)

  return { message: "رشد فنی یافت نشد", status: false }
}

const setDeleteTechnicalSkill = async (
  technicalGrowthId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteTechnicalGrowthResult = await deleteTechnicalGrowth(technicalGrowthId)

  if (deleteTechnicalGrowthResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "رشد فنی با موفقیت حذف شد" }
  }

  return { message: "حذف رشد فنی با مشکل مواجه شد", status: false }
}
