import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"
import { createImage, deleteImage, updateImage } from "@/actions/image"

import {
  SkillCreateInput,
  SkillIdAndImagePath,
  TypeCreateSkillParam,
  TypeSaveUpdatedSkillParam,
  TypeSkillIdAndImagePath,
} from "@/lib/types"
import {
  SchemaSkill,
  TypeReturnSererAction,
  TypeSkillForm,
  TypeSkillFormWithoutImage,
} from "@/lib/definition"

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
  const skillResult = await prisma.skill.create({
    data: {
      ...skill.infoForm,
      id: skill.id,
      image: skill.imageUrl,
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
  await prisma.skill.findUnique({ where: { id: skillId }, select: SkillCreateInput })

export const updateSkillImage = async (
  skillImageFile: TypeSkillForm["image"],
  skillImageUrl: string
): Promise<TypeReturnSererAction> => {
  if (skillImageFile?.size) {
    return await updateImage(skillImageUrl, skillImageFile)
  }
  return { status: true }
}

export const newSkillInfoIsEqual = (
  currentSkillInfo: TypeSkillFormWithoutImage,
  newSkillInfo: TypeSkillFormWithoutImage
) => isEqual(currentSkillInfo, newSkillInfo)

export const saveUpdatedSkill = async ({
  skill,
  reValidPath,
}: TypeSaveUpdatedSkillParam): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.skill.update({
    where: { id: skill.id },
    data: { ...skill.InfoFormWithoutImage, projects: { connect: skill.relatedProjects } },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Skill updated successfully", status: true }
  }

  return { message: "Skill update failed", status: false }
}

export const fetchSkillIdAndImagePath = async (
  skillId: string
): Promise<TypeSkillIdAndImagePath | null> =>
  await prisma.skill.findUnique({ where: { id: skillId }, select: SkillIdAndImagePath })

export const deleteSkill = async (skillId: string) =>
  await prisma.skill.delete({ where: { id: skillId } })
