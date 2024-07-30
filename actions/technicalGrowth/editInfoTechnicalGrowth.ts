"use server"

import {
  fetchTechnicalCreateInput,
  newTechnicalGrowthInfoIsEqual,
  saveUpdatedTechnicalGrowth,
  validateTechnicalGrowthForm,
} from "./technicalGrowthUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/definition"
import {
  TypeEditTechnicalGrowthFormActionParam,
  TypeSetEditTechnicalGrowthParam,
} from "@/lib/types"

export const editTechnicalGrowthFormAction = async ({
  technicalGrowth,
  reValidPath,
}: TypeEditTechnicalGrowthFormActionParam): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalGrowthForm(technicalGrowth.formData)

  if (validateResult.success)
    return setEditTechnicalGrowth({
      technicalGrowth: { id: technicalGrowth.id, InfoForm: validateResult.data },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditTechnicalGrowth = async ({
  technicalGrowth,
  reValidPath,
}: TypeSetEditTechnicalGrowthParam): Promise<TypeReturnSererAction> => {
  const getTechnicalGrowthResult = await fetchTechnicalCreateInput(technicalGrowth.id)
  if (!getTechnicalGrowthResult) return { status: false, message: "Technical Growth not found" }

  const isSkillInfoEqual = newTechnicalGrowthInfoIsEqual(
    getTechnicalGrowthResult,
    technicalGrowth.InfoForm
  )

  if (isSkillInfoEqual) return { status: false, message: "Please update filed first" }

  return saveUpdatedTechnicalGrowth(technicalGrowth.id, technicalGrowth.InfoForm, reValidPath)
}
