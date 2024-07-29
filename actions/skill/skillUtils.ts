import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"

import {
  SkillCreateInput,
  SkillIdAndImagePath,
  TypeCreateSkillParam,
  TypeSkillIdAndImagePath,
} from "@/lib/types"
import {
  SchemaSkill,
  TypeReturnSererAction,
  TypeSkillForm,
  TypeSkillFormWithoutImage,
} from "@/lib/definition"
import { Project } from "@prisma/client"

import { createImage, deleteImage, updateImage } from "@/actions/image"

export const validateSkillForm = (formData: FormData) =>
  SchemaSkill.safeParse({
    name: formData.get("name"),
    image: formData.get("image") as File,
    link: formData.get("link"),
    description: formData.get("description"),
  } as TypeSkillForm)

export const setImageSkill = async (skillId: string, skillImageFile: TypeSkillForm["image"]) => {
  if (!skillImageFile || !skillImageFile.size) {
    return imageIsRequired()
  }

  return await createImage(skillId, skillImageFile)
}

export const imageIsRequired = (): TypeReturnSererAction => ({
  message: "Image is required",
  status: false,
})

export const createSkill = async ({
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

export const fetchSkillCreateInput = async (skillId: string) =>
  await prisma.skills.findUnique({ where: { id: skillId }, select: SkillCreateInput })

export const updateSkillImage = async (
  skillImageFile: TypeSkillForm["image"],
  skillImagePath: string
): Promise<TypeReturnSererAction> => {
  if (skillImageFile?.size) {
    return await updateImage(skillImagePath, skillImageFile)
  }
  return { status: true }
}

export const newSkillInfoIsEqual = (
  currentSkillInfo: TypeSkillFormWithoutImage,
  newSkillInfo: TypeSkillFormWithoutImage
) => isEqual(currentSkillInfo, newSkillInfo)

export const saveUpdatedSkill = async (
  skillId: string,
  skillInfoFormWithoutImage: TypeSkillFormWithoutImage,
  relatedProjects: Project[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.skills.update({
    where: { id: skillId },
    data: { ...skillInfoFormWithoutImage, projects: { connect: relatedProjects } },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Profile updated successfully", status: true }
  }

  return { message: "Profile update failed", status: false }
}

export const fetchSkillIdAndImagePath = async (
  skillId: string
): Promise<TypeSkillIdAndImagePath | null> =>
  await prisma.skills.findUnique({ where: { id: skillId }, select: SkillIdAndImagePath })

export const deleteImageFromBucket = async (imagePath: string) => await deleteImage(imagePath)

export const deleteSkill = async (skillId: string) =>
  await prisma.skills.delete({ where: { id: skillId } })
