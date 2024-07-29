"use server"

import { v4 as uuid } from "uuid"
import { createProject, setImageProject, validateProjectForm } from "./projectUtils"

import { TypeErrors, TypeReturnSererAction, TypeProjectForm } from "@/lib/definition"
import { Skill } from "@prisma/client"

export const addProjectFormAction = async (
  formData: FormData,
  relatedSkills: Skill[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateProjectForm(formData)

  if (validateResult.success) return setProject(validateResult.data, relatedSkills, reValidPath)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setProject = async (
  projectInfoForm: TypeProjectForm,
  relatedSkills: Skill[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const projectId = uuid()

  const projectImageStatus = await setImageProject(projectId, projectInfoForm.image)
  if (projectImageStatus?.status) {
    const imageUrl = projectImageStatus.data as string
    return createProject({
      project: { id: projectId, imageUrl, infoForm: projectInfoForm, relatedSkills },
      reValidPath,
    })
  }

  return { message: projectImageStatus?.message, status: false }
}
