"use server"

import prisma from "@/lib/prisma"
import { SchemaAddProject, TypeAddProject, TypeAddProjectState } from "./definition"

export const addProject = async (
  _: TypeAddProjectState,
  formData: FormData
): Promise<TypeAddProjectState> => {
  const validationResult = SchemaAddProject.safeParse({
    image: (formData.get("image") as File).name === "undefined" ? "" : "imageSrc",
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeAddProject)

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors }
  }

  const projectResult = await prisma.project.create({ data: validationResult.data })

  if (projectResult) {
    return { message: "project create, successfully :)" }
  }

  return { message: "project creation got error :(" }
}
