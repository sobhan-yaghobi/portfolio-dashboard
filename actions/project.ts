"use server"

import prisma from "@/lib/prisma"
import { v4 as uuid } from "uuid"
import { isEqual } from "lodash"
import { SchemaAddProject, TypeAddProject, TypeErrors, TypeReturnSererAction } from "./definition"
import { ProjectCreateInput } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { createImage, deleteImage, updateImage } from "./image"

const projectObject = (formData: FormData) =>
  ({
    image: formData.get("image") as File,
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeAddProject)

export const addProject = async (
  formData: FormData,
  path: string
): Promise<TypeReturnSererAction> => {
  const mainProject = projectObject(formData)
  const validationResult = SchemaAddProject.safeParse(mainProject)

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }
  const projectId = uuid()

  const createImageResult = await createImage(projectId, mainProject.image)
  if (!createImageResult?.path) {
    return { message: createImageResult?.message, status: false }
  }

  const projectResult = await prisma.project.create({
    data: { ...validationResult.data, id: projectId, image: createImageResult.path },
  })
  if (projectResult) {
    revalidatePath(path)
    return { message: "project create, successfully", status: true }
  }

  return { message: "project creation failure", status: false }
}

export const editProject = async (
  id: string,
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const mainProject = projectObject(formData)
  const validationResult = SchemaAddProject.safeParse(mainProject)

  if (validationResult.success) {
    const projectResult = await prisma.project.findUnique({
      where: { id },
      select: ProjectCreateInput,
    })

    if (projectResult) {
      if (!isEqual(projectResult, mainProject)) {
        const updateImageResult = await updateImage(projectResult.image, mainProject.image)

        if (updateImageResult.status) {
          const { image, ...projectWithoutImage } = mainProject

          const updateResult = await prisma.project.update({
            where: { id },
            data: { ...projectWithoutImage },
          })

          if (updateResult) {
            return { message: "project update successfully", status: true }
          }
        }
        return { message: "update is got failure", status: false }
      }
      return { message: "please update the project field first !", status: false }
    }
    return { message: "project not found", status: false }
  }

  return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

export const deleteProject = async (id: string, path: string): Promise<TypeReturnSererAction> => {
  const projectResult = await prisma.project.findUnique({ where: { id } })
  if (projectResult) {
    const deleteImageResult = await deleteImage(projectResult.image)
    const deleteResult = await prisma.project.delete({ where: { id } })
    if (deleteResult && deleteImageResult.status) {
      revalidatePath(path)
      return { message: "project removed successfully", status: true }
    }
    return { message: "project remove got failure", status: false }
  }
  return { message: "project not found", status: false }
}

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany({ include: { skills: true } })
  return { data: projects ? projects : [], status: 201 }
}
