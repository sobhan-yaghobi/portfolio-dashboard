"use server"

import {
  fetchSkillCreateInput,
  newSkillInfoIsEqual,
  saveUpdatedSkill,
  updateSkillImage,
  validateSkillForm,
} from "./skillUtils"

import { Project } from "@prisma/client"
import { TypeErrors, TypeReturnSererAction, TypeSkillForm } from "@/lib/definition"

export const editSkillFormAction = async (
  skillId: string,
  formData: FormData,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(formData)

  if (validateResult.success) {
    return setEditSkill(skillId, validateResult.data, relatedProjects, reValidPath)
  }

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditSkill = async (
  skillId: string,
  skillInfoForm: TypeSkillForm,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const getSkillResult = await fetchSkillCreateInput(skillId)
  if (!getSkillResult) return { status: false, message: "Skill not found" }

  const { image: skillInfoImagePath, ...skillInfo } = getSkillResult
  const { image: skillImageForm, ...skillInfoFormWithoutImage } = skillInfoForm

  const isImageFormExist = Boolean(skillInfoForm.image?.size)

  const isImageInForm = await updateSkillImage(skillInfoForm.image, skillInfoImagePath)
  if (!isImageInForm.status) return { status: false, message: "Update image got failure" }

  const isSkillInfoEqual = newSkillInfoIsEqual(skillInfo, skillInfoFormWithoutImage)

  if (!isImageFormExist && isSkillInfoEqual)
    return { status: false, message: "Please update filed first" }

  return saveUpdatedSkill(skillId, skillInfoFormWithoutImage, relatedProjects, reValidPath)
}
