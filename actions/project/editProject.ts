"use server"

import {
  fetchProjectCreateInput,
  newProjectInfoIsEqual,
  saveUpdatedProject,
  updateProjectImage,
  validateProjectForm,
} from "./projectUtils"

import { Skill } from "@prisma/client"
import { TypeErrors, TypeProjectForm, TypeReturnSererAction } from "@/lib/definition"

export const editProjectFormAction = async (
  projectId: string,
  formData: FormData,
  relatedSkills: Skill[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateProjectForm(formData)

  if (validateResult.success) {
    return setEditProject(projectId, validateResult.data, relatedSkills, reValidPath)
  }

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setEditProject = async (
  projectId: string,
  projectInfoForm: TypeProjectForm,
  relatedSkills: Skill[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const getProjectResult = await fetchProjectCreateInput(projectId)
  if (!getProjectResult) return { status: false, message: "Project not found" }

  const { image: projectInfoImagePath, ...projectInfo } = getProjectResult
  const { image: projectImageForm, ...projectInfoFormWithoutImage } = projectInfoForm

  const isImageFormExist = Boolean(projectInfoForm.image?.size)

  const isImageInForm = await updateProjectImage(projectInfoForm.image, projectInfoImagePath)
  if (!isImageInForm.status) return { status: false, message: "Update image got failure" }

  const isProjectInfoEqual = newProjectInfoIsEqual(projectInfo, projectInfoFormWithoutImage)

  if (!isImageFormExist && isProjectInfoEqual)
    return { status: false, message: "Please update filed first" }

  return saveUpdatedProject(projectId, projectInfoFormWithoutImage, relatedSkills, reValidPath)
}
