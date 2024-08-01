"use server"

import {
  fetchTechnicalCreateInput,
  newTechnicalGrowthInfoIsEqual,
  saveUpdatedTechnicalGrowth,
  validateTechnicalGrowthForm,
} from "./technicalGrowthUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import {
  TypeEditTechnicalGrowthFormActionParams,
  TypeSetEditTechnicalGrowthParams,
} from "@/lib/types/technicalGrowth.type"

export const editTechnicalGrowthFormAction = async ({
  technicalGrowth,
  reValidPath,
}: TypeEditTechnicalGrowthFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalGrowthForm(technicalGrowth.formData)

  if (validateResult.success)
    return setEditTechnicalGrowth({
      technicalGrowth: { id: technicalGrowth.id, infoForm: validateResult.data },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditTechnicalGrowth = async ({
  technicalGrowth,
  reValidPath,
}: TypeSetEditTechnicalGrowthParams): Promise<TypeReturnSererAction> => {
  const getTechnicalGrowthResult = await fetchTechnicalCreateInput(technicalGrowth.id)
  if (!getTechnicalGrowthResult) return { status: false, message: "رشد فنی یافت نشد" }

  const isSkillInfoEqual = newTechnicalGrowthInfoIsEqual(
    getTechnicalGrowthResult,
    technicalGrowth.infoForm
  )

  if (isSkillInfoEqual) return { status: false, message: "لطفا فرم را بروزرسانی کنید" }

  return saveUpdatedTechnicalGrowth({
    technicalGrowth: { id: technicalGrowth.id, infoForm: technicalGrowth.infoForm },
    reValidPath,
  })
}
