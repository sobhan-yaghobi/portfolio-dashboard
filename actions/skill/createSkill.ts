"use server"

import { v4 as uuid } from "uuid"
import { createSkill, setImageSkill, validateSkillForm } from "./skillUtils"

import { TypeSkillForm, TypeErrors, TypeReturnSererAction } from "@/lib/definition"
import { Project } from "@prisma/client"

export const addSkillFormAction = async (
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

  const skillImageStatus = await setImageSkill(skillId, skillInfoForm.image)
  if (skillImageStatus?.status) {
    const imagePath = skillImageStatus.data as string
    return createSkill({
      skill: { id: skillId, imagePath, infoForm: skillInfoForm, relatedProjects },
      reValidPath,
    })
  }

  return { message: skillImageStatus?.message, status: false }
}
