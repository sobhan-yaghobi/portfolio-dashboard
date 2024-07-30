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
import { TypeEditProjectFormActionParam } from "@/lib/types"

export const editProjectFormAction = async ({
  project,
  reValidPath,
}: TypeEditProjectFormActionParam): Promise<TypeReturnSererAction> => {
  const validateResult = validateProjectForm(project.formData)

  if (validateResult.success) {
    return setEditProject({
      project: {
        id: project.id,
        infoForm: validateResult.data,
        relatedSkills: project.relatedSkills,
      },
      reValidPath,
    })
  }

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}
export type TypeSetEditProjectParam = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedSkills: Skill[]
  }
  reValidPath: string
}
const setEditProject = async ({
  project,
  reValidPath,
}: TypeSetEditProjectParam): Promise<TypeReturnSererAction> => {
  const getProjectResult = await fetchProjectCreateInput(project.id)
  if (!getProjectResult) return { status: false, message: "Project not found" }

  const { image: projectInfoImagePath, ...projectInfo } = getProjectResult
  const { image: projectImageForm, ...projectInfoFormWithoutImage } = project.infoForm

  const isImageFormExist = Boolean(project.infoForm.image?.size)

  const updatedImageResult = await updateProjectImage(project.infoForm.image, projectInfoImagePath)
  if (!updatedImageResult.status) return { status: false, message: "Update image got failure" }

  const isProjectInfoEqual = newProjectInfoIsEqual(projectInfo, projectInfoFormWithoutImage)

  if (!isImageFormExist && isProjectInfoEqual)
    return { status: false, message: "Please update filed first" }

  return saveUpdatedProject(
    project.id,
    projectInfoFormWithoutImage,
    project.relatedSkills,
    reValidPath
  )
}
