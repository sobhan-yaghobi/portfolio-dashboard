import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"
import { createImage, updateImage } from "@/actions/image"

import {
  SkillCreateInput,
  SkillIdAndImagePath,
  TypeCreateSkillParams,
  TypeSaveUpdatedSkillParams,
  TypeSkillIdAndImagePath,
} from "@/lib/types/skill.type"
import { SchemaSkill, TypeSkillForm, TypeSkillFormWithoutImage } from "@/lib/schema/skill.schema"
import { TypeReturnSererAction } from "@/lib/types/utils.type"

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
}: TypeCreateSkillParams): Promise<TypeReturnSererAction> => {
  const skillResult = await prisma.skill.create({
    data: {
      ...skill.infoForm,
      id: skill.id,
      image: skill.imageUrl,
      projectList: { connect: skill.relatedProjectList || [] },
    },
  })

  if (skillResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت با موفقیت ساخته شد", status: true }
  }

  return { message: "ساخت مهارت با مشکل مواجه شد", status: false }
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
}: TypeSaveUpdatedSkillParams): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.skill.update({
    where: { id: skill.id },
    data: { ...skill.InfoFormWithoutImage, projectList: { connect: skill.relatedProjectList } },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت با موفقیت بروزرسانی شد", status: true }
  }

  return { message: "بروزرسانی مهارت با مشکل مواجه شد", status: false }
}

export const fetchSkillIdAndImagePath = async (
  skillId: string
): Promise<TypeSkillIdAndImagePath | null> =>
  await prisma.skill.findUnique({ where: { id: skillId }, select: SkillIdAndImagePath })

export const deleteSkill = async (skillId: string) =>
  await prisma.skill.delete({ where: { id: skillId } })
