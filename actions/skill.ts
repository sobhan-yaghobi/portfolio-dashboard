"use server"

import prisma from "@/lib/prisma"
import { SchemaSkill, TypeSkillForm, TypeErrors, TypeReturnSererAction } from "../lib/definition"
import { revalidatePath } from "next/cache"
import { SkillCreateInput, TypeCreateSkillParam } from "@/lib/types"
import { isEqual } from "lodash"
import { Project } from "@prisma/client"
import { v4 as uuid } from "uuid"
import { createImage } from "./image"

export const addSkillFormAction = async (
  formData: FormData,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(formData)

  if (validateResult.success) return setSkill(validateResult.data, relatedProjects, reValidPath)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validateSkillForm = (formData: FormData) =>
  SchemaSkill.safeParse({
    name: formData.get("name"),
    image: formData.get("image") as File,
    link: formData.get("link"),
    description: formData.get("description"),
  } as TypeSkillForm)

const setSkill = async (
  skillInfoForm: TypeSkillForm,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const skillId = uuid()

  const skillImageStatus = await setImageSkill(skillId, skillInfoForm.image)
  if (skillImageStatus?.status) {
    const imagePath = skillImageStatus.data as string
    return createSkill({
      skill: { id: skillId, imagePath, infoForm: skillInfoForm, relatedProjects },
      reValidPath,
    })
  }

  return { message: skillImageStatus?.message, status: false }
}

const setImageSkill = async (skillId: string, skillImageFile: TypeSkillForm["image"]) => {
  if (!skillImageFile || !skillImageFile.size) {
    return imageIsRequired()
  }

  return await createImage(skillId, skillImageFile)
}

const imageIsRequired = (): TypeReturnSererAction => ({
  message: "Image is required",
  status: false,
})

const createSkill = async ({
  skill,
  reValidPath,
}: TypeCreateSkillParam): Promise<TypeReturnSererAction> => {
  const skillResult = await prisma.skills.create({
    data: {
      ...skill.infoForm,
      id: skill.id,
      image: skill.imagePath,
      projects: { connect: skill.relatedProjects || [] },
    },
  })

  if (skillResult) {
    revalidatePath(reValidPath)
    return { message: "Skill create, successfully", status: true }
  }

  return { message: "Skill create failure", status: false }
}

export const editSkill = async (
  id: string,
  formData: FormData,
  projects: Project[],
  path: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateSkillForm(formData)

  if (validateResult) {
    const skillResult = await prisma.skills.findUnique({
      where: { id },
      select: SkillCreateInput,
    })
    if (skillResult) {
      if (!isEqual(skillResult, skill)) {
        const updateResult = await prisma.skills.update({
          where: { id },
          data: { ...skill, projects: { connect: projects } },
        })

        if (updateResult) {
          revalidatePath(path)
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

export const deleteSkillFormAction = async (
  id: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteResult = await prisma.skills.delete({ where: { id } })

  if (deleteResult) {
    revalidatePath(reValidPath)
    return { message: "Project removed successfully", status: true }
  }
  return { message: "Project remove got failure", status: false }
}
