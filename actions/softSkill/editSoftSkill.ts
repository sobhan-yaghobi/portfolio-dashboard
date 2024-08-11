"use server"

import {
  fetchSoftSkill,
  newSoftSkillInfoIsEqual,
  saveUpdatedSoftSkill,
  validateSoftSkillForm,
} from "./softSkillUtils"

import {
  TypeEditSoftSkillFormActionParams,
  TypeSetEditSoftSkillParams,
} from "@/lib/types/softSkill.type"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"

export const editSoftSkillFormAction = async ({
  softSkill,
  reValidPath,
}: TypeEditSoftSkillFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateSoftSkillForm(softSkill.formData)

  if (validateResult.success)
    return setEditSoftSkill({
      softSkill: {
        id: softSkill.id,
        infoForm: validateResult.data,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

export const setEditSoftSkill = async ({
  softSkill,
  reValidPath,
}: TypeSetEditSoftSkillParams): Promise<TypeReturnSererAction> => {
  const softSkillResult = await fetchSoftSkill(softSkill.id)
  if (!softSkillResult) return { status: false, message: "مهارت نرم یافت نشد" }

  const isSoftSkillInfoEqual = newSoftSkillInfoIsEqual(softSkillResult, softSkill.infoForm)

  if (isSoftSkillInfoEqual) return { status: false, message: "لطفا فرم را بروزرسانی کنید" }

  return saveUpdatedSoftSkill({
    softSkill: {
      id: softSkill.id,
      infoForm: softSkill.infoForm,
    },
    reValidPath,
  })
}
