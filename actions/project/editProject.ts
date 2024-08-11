"use server"

import {
  fetchProjectCreateInput,
  newProjectInfoIsEqual,
  saveUpdatedProject,
  updateProjectImage,
  validateProjectForm,
} from "./projectUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeEditProjectFormActionParams, TypeSetEditProjectParams } from "@/lib/types/project.type"

export const editProjectFormAction = async ({
  project,
  reValidPath,
}: TypeEditProjectFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateProjectForm(project.formData)

  if (validateResult.success) {
    return setEditProject({
      project: {
        id: project.id,
        infoForm: validateResult.data,
        relatedTechnicalSkillList: project.relatedTechnicalSkillList,
      },
      reValidPath,
    })
  }

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditProject = async ({
  project,
  reValidPath,
}: TypeSetEditProjectParams): Promise<TypeReturnSererAction> => {
  const getProjectResult = await fetchProjectCreateInput(project.id)
  if (!getProjectResult) return { status: false, message: "پروژه یافت نشد" }

  const { image: projectInfoImagePath, ...projectInfo } = getProjectResult
  const { image: projectImageForm, ...projectInfoFormWithoutImage } = project.infoForm

  const isImageFormExist = Boolean(project.infoForm.image?.size)

  const updatedImageResult = await updateProjectImage(project.infoForm.image, projectInfoImagePath)
  if (!updatedImageResult.status)
    return { status: false, message: "بروزرسانی عکس با مشکل مواجه شد" }

  const isProjectInfoEqual = newProjectInfoIsEqual(projectInfo, projectInfoFormWithoutImage)

  if (!isImageFormExist && isProjectInfoEqual)
    return { status: false, message: "لطفا فرم را بروزرسانی کنید" }

  return saveUpdatedProject({
    project: {
      id: project.id,
      InfoFormWithoutImage: projectInfoFormWithoutImage,
      relatedTechnicalSkillList: project.relatedTechnicalSkillList,
      imageUrl: typeof updatedImageResult.data === "string" ? updatedImageResult.data : undefined,
    },
    reValidPath,
  })
}
