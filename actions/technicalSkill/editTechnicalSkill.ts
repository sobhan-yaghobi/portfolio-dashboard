"use server"

import {
  fetchTechnicalSkillCreateInput,
  newTechnicalSkillInfoIsEqual,
  saveUpdatedTechnicalSkill,
  updateTechnicalSkillImage,
  validateTechnicalSkillForm,
} from "./technicalSkillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import {
  TypeEditTechnicalSkillFormActionParams,
  TypeSetEditTechnicalSkillParams,
} from "@/lib/types/technicalSkill.type"

export const editTechnicalSkillFormAction = async ({
  technicalSkill,
  reValidPath,
}: TypeEditTechnicalSkillFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalSkillForm(technicalSkill.formData)

  if (validateResult.success)
    return setEditTechnicalSkill({
      technicalSkill: {
        id: technicalSkill.id,
        infoForm: validateResult.data,
        relatedProjectList: technicalSkill.relatedProjectList,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditTechnicalSkill = async ({
  technicalSkill,
  reValidPath,
}: TypeSetEditTechnicalSkillParams): Promise<TypeReturnSererAction> => {
  const getTechnicalSkillResult = await fetchTechnicalSkillCreateInput(technicalSkill.id)
  if (!getTechnicalSkillResult) return { status: false, message: "مهارت یافت نشد" }

  const { image: technicalSkillInfoImagePath, ...technicalSkillInfo } = getTechnicalSkillResult
  const { image: technicalSkillImageForm, ...technicalSkillInfoFormWithoutImage } =
    technicalSkill.infoForm

  const isImageFormExist = Boolean(technicalSkill.infoForm.image?.size)

  const updatedImageResult = await updateTechnicalSkillImage(
    technicalSkill.infoForm.image,
    technicalSkillInfoImagePath
  )
  if (!updatedImageResult.status)
    return { status: false, message: "بروزرسانی عکس با مشکل مواجه شد" }

  const isTechnicalSkillInfoEqual = newTechnicalSkillInfoIsEqual(
    technicalSkillInfo,
    technicalSkillInfoFormWithoutImage
  )

  if (!isImageFormExist && isTechnicalSkillInfoEqual)
    return { status: false, message: "لطفا فرم را بروزرسانی کنید" }

  return saveUpdatedTechnicalSkill({
    technicalSkill: {
      id: technicalSkill.id,
      InfoFormWithoutImage: technicalSkillInfoFormWithoutImage,
      relatedProjectList: technicalSkill.relatedProjectList,
      imageUrl: typeof updatedImageResult.data === "string" ? updatedImageResult.data : undefined,
    },
    reValidPath,
  })
}
