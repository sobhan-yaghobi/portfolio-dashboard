"use server"

import {
  fetchSkillCreateInput,
  newSkillInfoIsEqual,
  saveUpdatedSkill,
  updateSkillImage,
  validateSkillForm,
} from "./skillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeEditSkillFormActionParams, TypeSetEditSkillParams } from "@/lib/types/skill.type"

export const editSkillFormAction = async ({
  skill,
  reValidPath,
}: TypeEditSkillFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(skill.formData)

  if (validateResult.success)
    return setEditSkill({
      skill: {
        id: skill.id,
        infoForm: validateResult.data,
        relatedProjectList: skill.relatedProjectList,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditSkill = async ({
  skill,
  reValidPath,
}: TypeSetEditSkillParams): Promise<TypeReturnSererAction> => {
  const getSkillResult = await fetchSkillCreateInput(skill.id)
  if (!getSkillResult) return { status: false, message: "مهارت یافت نشد" }

  const { image: skillInfoImagePath, ...skillInfo } = getSkillResult
  const { image: skillImageForm, ...skillInfoFormWithoutImage } = skill.infoForm

  const isImageFormExist = Boolean(skill.infoForm.image?.size)

  const updatedImageResult = await updateSkillImage(skill.infoForm.image, skillInfoImagePath)
  if (!updatedImageResult.status)
    return { status: false, message: "بروزرسانی عکس با مشکل مواجه شد" }

  const isSkillInfoEqual = newSkillInfoIsEqual(skillInfo, skillInfoFormWithoutImage)

  if (!isImageFormExist && isSkillInfoEqual)
    return { status: false, message: "لطفا فرم را بروزرسانی کنید" }

  return saveUpdatedSkill({
    skill: {
      id: skill.id,
      InfoFormWithoutImage: skillInfoFormWithoutImage,
      relatedProjectList: skill.relatedProjectList,
    },
    reValidPath,
  })
}
