"use server"

import { TypeErrors, TypeReturnSererAction, TypeTechnicalGrowthForm } from "@/lib/definition"
import {
  fetchTechnicalCreateInput,
  newTechnicalGrowthInfoIsEqual,
  saveUpdatedTechnicalGrowth,
  validateTechnicalGrowthForm,
} from "./technicalGrowthUtils"

export const editTechnicalGrowthFormAction = async (
  technicalGrowthId: string,
  formData: FormData,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalGrowthForm(formData)

  if (validateResult.success) {
    return setEditTechnicalGrowth(technicalGrowthId, validateResult.data, reValidPath)
  }

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditTechnicalGrowth = async (
  technicalGrowthId: string,
  technicalGrowthInfoForm: TypeTechnicalGrowthForm,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const getTechnicalGrowthResult = await fetchTechnicalCreateInput(technicalGrowthId)
  if (!getTechnicalGrowthResult) return { status: false, message: "Technical Growth not found" }

  const isSkillInfoEqual = newTechnicalGrowthInfoIsEqual(
    getTechnicalGrowthResult,
    technicalGrowthInfoForm
  )

  if (isSkillInfoEqual) return { status: false, message: "Please update filed first" }

  return saveUpdatedTechnicalGrowth(technicalGrowthId, technicalGrowthInfoForm, reValidPath)
}
