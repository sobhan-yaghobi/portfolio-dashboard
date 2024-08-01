import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"
import { createImage, updateImage } from "../image"

import {
  SchemaProject,
  TypeProjectForm,
  TypeProjectFormWithoutImage,
  TypeReturnSererAction,
} from "@/lib/definition"
import {
  ProjectCreateInput,
  ProjectIdAndImagePath,
  TypeCreateProjectParams,
  TypeProjectIdAndImagePath,
  TypeSaveUpdatedProjectParams,
} from "@/lib/types/project.type"

export const validateProjectForm = (formData: FormData) =>
  SchemaProject.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeProjectForm)

export const setImageProject = async (
  projectId: string,
  projectImageFile: TypeProjectForm["image"]
) => {
  if (!projectImageFile || !projectImageFile.size) {
    return imageIsRequired()
  }

  return await createImage(projectId, projectImageFile)
}

export const imageIsRequired = (): TypeReturnSererAction => ({
  message: "Image is required",
  status: false,
})

export const createProject = async ({
  project,
  reValidPath,
}: TypeCreateProjectParams): Promise<TypeReturnSererAction> => {
  const projectResult = await prisma.project.create({
    data: {
      ...project.infoForm,
      id: project.id,
      image: project.imageUrl,
      skills: { connect: project.relatedSkills || [] },
    },
  })

  if (projectResult) {
    revalidatePath(reValidPath)
    return { message: "Project create, successfully", status: true }
  }

  return { message: "Project create failure", status: false }
}

export const fetchProjectCreateInput = async (projectId: string) =>
  await prisma.project.findUnique({ where: { id: projectId }, select: ProjectCreateInput })

export const updateProjectImage = async (
  projectImageFile: TypeProjectForm["image"],
  projectImageUrl: string
): Promise<TypeReturnSererAction> => {
  if (projectImageFile?.size) {
    return await updateImage(projectImageUrl, projectImageFile)
  }

  return { status: true }
}

export const newProjectInfoIsEqual = (
  currentProjectInfo: TypeProjectFormWithoutImage,
  newProjectInfo: TypeProjectFormWithoutImage
) => isEqual(currentProjectInfo, newProjectInfo)

export const saveUpdatedProject = async ({
  project,
  reValidPath,
}: TypeSaveUpdatedProjectParams): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.project.update({
    where: { id: project.id },
    data: {
      ...project.InfoFormWithoutImage,
      ...(project.imageUrl && { image: project.imageUrl }),
      skills: { connect: project.relatedSkills },
    },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Project updated successfully", status: true }
  }

  return { message: "Project update failed", status: false }
}

export const fetchProjectIdAndImagePath = async (
  projectId: string
): Promise<TypeProjectIdAndImagePath | null> =>
  await prisma.project.findUnique({ where: { id: projectId }, select: ProjectIdAndImagePath })

export const deleteProject = async (projectId: string) =>
  await prisma.project.delete({ where: { id: projectId } })
