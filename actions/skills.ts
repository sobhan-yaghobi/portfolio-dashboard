"use server"

import prisma from "@/lib/prisma"
import { SchemaAddSkill, TypeAddSkill, TypeErrors, TypeReturnSererAction } from "./definition"
import { revalidatePath } from "next/cache"
import { SkillCreateInput } from "@/lib/types"
import { isEqual } from "lodash"

const skillObject = (formData: FormData) =>
  ({
    name: formData.get("name"),
    image: (formData.get("image") as File).name === "undefined" ? "" : "imageSrc",
    link: formData.get("link"),
    description: formData.get("description"),
  } as TypeAddSkill)

export const addSkill = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAddSkill.safeParse(skillObject(formData))

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const skillResult = await prisma.skills.create({ data: validationResult.data })
  if (skillResult) {
    return { message: "skill create, successfully", status: true }
  }

  return { message: "skill creation failure", status: false }
}

export const editSkill = async (id: string, formData: FormData): Promise<TypeReturnSererAction> => {
  const skill = skillObject(formData)
  const validationResult = SchemaAddSkill.safeParse(skill)

  if (validationResult.success) {
    const skillResult = await prisma.skills.findUnique({
      where: { id },
      select: SkillCreateInput,
    })
    if (skillResult) {
      if (!isEqual(skillResult, skill)) {
        const updateResult = await prisma.skills.update({ where: { id }, data: skill })
        if (updateResult) {
          return { message: "skill update successfully", status: true }
        }
        return { message: "update is got failure", status: false }
      }
      return { message: "please update the skill field first !", status: false }
    }
    return { message: "skill not found", status: false }
  }

  return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

export const deleteSkill = async (id: string, path: string): Promise<TypeReturnSererAction> => {
  const deleteResult = await prisma.skills.delete({ where: { id } })
  if (deleteResult) {
    revalidatePath(path)
    return { message: "project removed successfully", status: true }
  }
  return { message: "project remove got failure", status: false }
}
