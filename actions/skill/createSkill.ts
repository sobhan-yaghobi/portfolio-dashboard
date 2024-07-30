"use server"

import { v4 as uuid } from "uuid"
import { createSkill, setImageSkill, validateSkillForm } from "./skillUtils"

import { TypeSkillForm, TypeErrors, TypeReturnSererAction } from "@/lib/definition"
import { Project } from "@prisma/client"

export const createSkillFormAction = async (
  formData: FormData,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(formData)

  if (validateResult.success) return setSkill(validateResult.data, relatedProjects, reValidPath)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setSkill = async (
  skillInfoForm: TypeSkillForm,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const skillId = uuid()

  const skillImageResult = await setImageSkill(skillId, skillInfoForm.image)

  if (skillImageResult?.status) {
    const imageUrl = skillImageResult.data as string
    return createSkill({
      skill: { id: skillId, imageUrl, infoForm: skillInfoForm, relatedProjects },
      reValidPath,
    })
  }

  return { message: skillImageResult?.message, status: false }
}
