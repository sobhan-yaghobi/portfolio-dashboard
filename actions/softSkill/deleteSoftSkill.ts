import { revalidatePath } from "next/cache"
import { deleteSoftSkill, isSoftSkillExist } from "./softSkillUtils"

import { TypeReturnSererAction } from "@/lib/types/utils.type"

export const deleteSoftSkillFormAction = async (
  softSkillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const isSoftSkillExistResult = isSoftSkillExist(softSkillId)

  if (isSoftSkillExistResult) return setDeleteSoftSkill(softSkillId, reValidPath)

  return { message: "مهارت نرم یافت نشد", status: false }
}

const setDeleteSoftSkill = async (
  softSkillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteSoftSkillResult = await deleteSoftSkill(softSkillId)

  if (deleteSoftSkillResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "مهارت نرم با موفقیت حذف شد" }
  }

  return { message: "حذف مهارت نرم با مشکل مواجه شد", status: false }
}
