"use server"

import { v4 as uuid } from "uuid"
import { createSkill, setImageSkill, validateSkillForm } from "./skillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeCreateSkillFormActionParams, TypeSetSkillParams } from "@/lib/types/skill.type"

export const createSkillFormAction = async ({
  skill,
  reValidPath,
}: TypeCreateSkillFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(skill.formData)

  if (validateResult.success)
    return setSkill({
      skill: {
        infoForm: validateResult.data,
        relatedProjects: skill.relatedProjects,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setSkill = async ({
  skill,
  reValidPath,
}: TypeSetSkillParams): Promise<TypeReturnSererAction> => {
  const skillId = uuid()

  const skillImageResult = await setImageSkill(skillId, skill.infoForm.image)

  if (skillImageResult?.status) {
    const imageUrl = skillImageResult.data as string
    return createSkill({
      skill: {
        id: skillId,
        imageUrl,
        infoForm: skill.infoForm,
        relatedProjects: skill.relatedProjects,
      },
      reValidPath,
    })
  }

  return { message: skillImageResult?.message, status: false }
}
