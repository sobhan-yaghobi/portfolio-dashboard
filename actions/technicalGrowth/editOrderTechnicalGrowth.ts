"use server"

import { setNewOrderTechnicalGrowthList, updateTechnicalGrowthOrder } from "./technicalGrowthUtils"
import { TechnicalGrowth } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { TypeReturnSererAction } from "@/lib/types/utils.type"

export const editOrderTechnicalGrowthFormAction = async (
  updateTechnicalGrowthList: TechnicalGrowth[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const newTechnicalGrowthList = setNewOrderTechnicalGrowthList(updateTechnicalGrowthList)

  return setTechnicalGrowthList(newTechnicalGrowthList, reValidPath)
}

const setTechnicalGrowthList = async (
  technicalGrowthList: TechnicalGrowth[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  try {
    for (const technicalGrowth of technicalGrowthList) {
      await updateTechnicalGrowthOrder(technicalGrowth)
    }
    revalidatePath(reValidPath)
    return { message: "Update orders successfully", status: true }
  } catch (_) {
    return { message: "Update orders failure", status: false }
  }
}
