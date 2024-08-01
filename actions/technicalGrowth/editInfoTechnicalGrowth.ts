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
  if (!getTechnicalGrowthResult) return { status: false, message: "Technical Growth not found" }

  const isSkillInfoEqual = newTechnicalGrowthInfoIsEqual(
    getTechnicalGrowthResult,
    technicalGrowth.infoForm
  )

  if (isSkillInfoEqual) return { status: false, message: "Please update filed first" }

  return saveUpdatedTechnicalGrowth({
    technicalGrowth: { id: technicalGrowth.id, infoForm: technicalGrowth.infoForm },
    reValidPath,
  })
}
