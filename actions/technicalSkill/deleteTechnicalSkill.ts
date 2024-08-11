"use server"

import { revalidatePath } from "next/cache"
import { deleteTechnicalSkill, fetchTechnicalSkillIdAndImagePath } from "./technicalSkillUtils"

import { TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeSetDeleteTechnicalSkillParams } from "@/lib/types/technicalSkill.type"

import { deleteImage } from "../image"

export const deleteTechnicalSkillFormAction = async (
  technicalSkillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const technicalSkillInfo = await fetchTechnicalSkillIdAndImagePath(technicalSkillId)

  if (technicalSkillInfo)
    return setDeleteTechnicalSkill({ technicalSkill: technicalSkillInfo, reValidPath })

  return { message: "حذف مهارت با مشکل مواجه شد", status: false }
}

const setDeleteTechnicalSkill = async ({
  technicalSkill,
  reValidPath,
}: TypeSetDeleteTechnicalSkillParams): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImage(technicalSkill.image)
  const deleteTechnicalSkillResult = await deleteTechnicalSkill(technicalSkill.id)

  if (deleteImageResult.status && deleteTechnicalSkillResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "مهارت با موفقیت حذف شد" }
  }

  return { message: "حذف مهارت با مشکل مواجه شد", status: false }
}
