"use server"

import { v4 as uuid } from "uuid"
import {
  createTechnicalSkill,
  setImageTechnicalSkill,
  validateTechnicalSkillForm,
} from "./technicalSkillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import {
  TypeCreateTechnicalSkillFormActionParams,
  TypeSetTechnicalSkillParams,
} from "@/lib/types/technicalSkill.type"

export const createTechnicalSkillFormAction = async ({
  technicalSkill,
  reValidPath,
}: TypeCreateTechnicalSkillFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalSkillForm(technicalSkill.formData)

  if (validateResult.success)
    return setTechnicalSkill({
      technicalSkill: {
        infoForm: validateResult.data,
        relatedProjectList: technicalSkill.relatedProjectList,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setTechnicalSkill = async ({
  technicalSkill,
  reValidPath,
}: TypeSetTechnicalSkillParams): Promise<TypeReturnSererAction> => {
  const technicalSkillId = uuid()

  const technicalSkillImageResult = await setImageTechnicalSkill(
    technicalSkillId,
    technicalSkill.infoForm.image
  )

  if (technicalSkillImageResult?.status) {
    const imageUrl = technicalSkillImageResult.data as string
    return createTechnicalSkill({
      technicalSkill: {
        id: technicalSkillId,
        imageUrl,
        infoForm: technicalSkill.infoForm,
        relatedProjectList: technicalSkill.relatedProjectList,
      },
      reValidPath,
    })
  }

  return { message: technicalSkillImageResult?.message, status: false }
}
