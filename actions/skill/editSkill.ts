"use server"

import {
  fetchSkillCreateInput,
  newSkillInfoIsEqual,
  saveUpdatedSkill,
  updateSkillImage,
  validateSkillForm,
} from "./skillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/definition"
import { TypeEditSkillFormActionParma, TypeSetEditSkillParam } from "@/lib/types"

export const editSkillFormAction = async ({
  skill,
  reValidPath,
}: TypeEditSkillFormActionParma): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(skill.formData)

  if (validateResult.success)
    return setEditSkill({
      skill: {
        id: skill.id,
        infoForm: validateResult.data,
        relatedProjects: skill.relatedProjects,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditSkill = async ({
  skill,
  reValidPath,
}: TypeSetEditSkillParam): Promise<TypeReturnSererAction> => {
  const getSkillResult = await fetchSkillCreateInput(skill.id)
  if (!getSkillResult) return { status: false, message: "Skill not found" }

  const { image: skillInfoImagePath, ...skillInfo } = getSkillResult
  const { image: skillImageForm, ...skillInfoFormWithoutImage } = skill.infoForm

  const isImageFormExist = Boolean(skill.infoForm.image?.size)

  const updatedImageResult = await updateSkillImage(skill.infoForm.image, skillInfoImagePath)
  if (!updatedImageResult.status) return { status: false, message: "Update image got failure" }

  const isSkillInfoEqual = newSkillInfoIsEqual(skillInfo, skillInfoFormWithoutImage)

  if (!isImageFormExist && isSkillInfoEqual)
    return { status: false, message: "Please update filed first" }

  return saveUpdatedSkill({
    skill: {
      id: skill.id,
      InfoFormWithoutImage: skillInfoFormWithoutImage,
      relatedProjects: skill.relatedProjects,
    },
    reValidPath,
  })
}
