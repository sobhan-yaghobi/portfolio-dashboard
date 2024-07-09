"use server"

import { SchemaAddProject, TypeAddProject, TypeErrors, TypeReturnSererAction } from "./definition"

import prisma from "@/lib/prisma"

export const addProject = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAddProject.safeParse({
    image: (formData.get("image") as File).name === "undefined" ? "" : "imageSrc",
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeAddProject)

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const projectResult = await prisma.project.create({ data: validationResult.data })
  if (projectResult) {
    return { message: "project create, successfully", status: true }
  }

  return { message: "project creation failure", status: false }
}

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany()
  return { data: projects ? projects : [], status: 201 }
}
