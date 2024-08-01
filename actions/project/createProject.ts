"use server"

import { v4 as uuid } from "uuid"
import { createProject, setImageProject, validateProjectForm } from "./projectUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/definition"
import { TypeCreateProjectFormActionParams, TypeSetProjectParams } from "@/lib/types/project.type"

export const createProjectFormAction = async ({
  project,
  reValidPath,
}: TypeCreateProjectFormActionParams): Promise<TypeReturnSererAction> => {
  const validateResult = validateProjectForm(project.formData)

  if (validateResult.success)
    return setProject({
      project: { infoForm: validateResult.data, relatedSkills: project.relatedSkills },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setProject = async ({
  project,
  reValidPath,
}: TypeSetProjectParams): Promise<TypeReturnSererAction> => {
  const projectId = uuid()

  const projectImageStatus = await setImageProject(projectId, project.infoForm.image)
  if (projectImageStatus?.status) {
    const imageUrl = projectImageStatus.data as string
    return createProject({
      project: {
        id: projectId,
        imageUrl,
        infoForm: project.infoForm,
        relatedSkills: project.relatedSkills,
      },
      reValidPath,
    })
  }

  return { message: projectImageStatus?.message, status: false }
}
