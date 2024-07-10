"use server"

import prisma from "@/lib/prisma"
import { SchemaAddSkills, TypeAddSkills, TypeErrors, TypeReturnSererAction } from "./definition"
import { revalidatePath } from "next/cache"

const skillsObject = (formData: FormData) =>
  ({
    name: formData.get("name"),
    image: (formData.get("image") as File).name === "undefined" ? "" : "imageSrc",
    link: formData.get("link"),
    description: formData.get("description"),
  } as TypeAddSkills)

export const addSkills = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAddSkills.safeParse(skillsObject(formData))

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const skillsResult = await prisma.skills.create({ data: validationResult.data })
  if (skillsResult) {
    return { message: "skills create, successfully", status: true }
  }

  return { message: "skills creation failure", status: false }
}

export const deleteSkill = async (id: string, path: string): Promise<TypeReturnSererAction> => {
  const deleteResult = await prisma.skills.delete({ where: { id } })
  if (deleteResult) {
    revalidatePath(path)
    return { message: "project removed successfully", status: true }
  }
  return { message: "project remove got failure", status: false }
}
