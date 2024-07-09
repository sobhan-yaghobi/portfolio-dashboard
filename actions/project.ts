"use server"

import prisma from "@/lib/prisma"
import { isEqual } from "lodash"
import { SchemaAddProject, TypeAddProject, TypeErrors, TypeReturnSererAction } from "./definition"
import { ProjectCreateInput } from "@/lib/types"
import { revalidatePath } from "next/cache"

const projectObject = (formData: FormData) =>
  ({
    image: (formData.get("image") as File).name === "undefined" ? "" : "imageSrc",
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeAddProject)

export const addProject = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAddProject.safeParse(projectObject(formData))

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const projectResult = await prisma.project.create({ data: validationResult.data })
  if (projectResult) {
    return { message: "project create, successfully", status: true }
  }

  return { message: "project creation failure", status: false }
}

export const editProject = async (
  id: string,
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAddProject.safeParse(projectObject(formData))

  if (validationResult.success) {
    const projectResult = await prisma.project.findUnique({
      where: { id },
      select: ProjectCreateInput,
    })
    if (projectResult) {
      const updatedProject = projectObject(formData)
      if (!isEqual(projectResult, updatedProject)) {
        const updateResult = await prisma.project.update({ where: { id }, data: updatedProject })
        if (updateResult) {
          return { message: "project update successfully", status: true }
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
  const deleteResult = await prisma.project.delete({ where: { id } })
  if (deleteResult) {
    revalidatePath(path)
    return { message: "project removed successfully", status: true }
  }
  return { message: "project remove got failure", status: false }
}

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany()
  return { data: projects ? projects : [], status: 201 }
}
