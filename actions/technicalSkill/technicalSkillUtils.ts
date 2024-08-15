import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"
import { createImage, updateImage } from "@/actions/image"

import {
  TechnicalSkillCreateInput,
  TechnicalSkillIdAndImagePath,
  TypeCreateTechnicalSkillParams,
  TypeSaveUpdatedTechnicalSkillParams,
  TypeTechnicalSkillIdAndImagePath,
} from "@/lib/types/technicalSkill.type"
import {
  SchemaTechnicalSkill,
  TypeTechnicalSkillForm,
  TypeTechnicalSkillFormWithoutImage,
} from "@/lib/schema/technicalSkill.schema"
import { TypeReturnSererAction } from "@/lib/types/utils.type"
import { experienceYearTime } from "@prisma/client"

export const experienceYearTimeTitles: Record<experienceYearTime, string> = {
  LESS_ONE_YEAR: "کمتر از یک سال",
  BETWEEN_ONE_AND_TWO_YEAR: "بین یک تا دو سال",
  BETWEEN_TWO_AND_FOUR_YEAR: "بین دو تا چهار سال",
  BETWEEN_FOUR_AND_TEN_YEAR: "بین چهار تا ده سال",
  MORE_TEN_YEAR: "بیشتر از ده سال",
}

export const validateTechnicalSkillForm = (formData: FormData) =>
  SchemaTechnicalSkill.safeParse({
    name: formData.get("name"),
    image: formData.get("image") as File,
    link: formData.get("link"),
    description: formData.get("description"),
    experienceYearTime: formData.get("experienceYearTime"),
  } as TypeTechnicalSkillForm)

export const setImageTechnicalSkill = async (
  technicalSkillId: string,
  technicalSkillImageFile: TypeTechnicalSkillForm["image"]
) => {
  if (!technicalSkillImageFile || !technicalSkillImageFile.size) {
    return imageIsRequired()
  }

  return await createImage(technicalSkillId, technicalSkillImageFile)
}

export const imageIsRequired = (): TypeReturnSererAction => ({
  message: "Image is required",
  status: false,
})

export const createTechnicalSkill = async ({
  technicalSkill,
  reValidPath,
}: TypeCreateTechnicalSkillParams): Promise<TypeReturnSererAction> => {
  const technicalSkillResult = await prisma.technicalSkill.create({
    data: {
      ...technicalSkill.infoForm,
      id: technicalSkill.id,
      image: technicalSkill.imageUrl,
      projectList: { connect: technicalSkill.relatedProjectList || [] },
    },
  })

  if (technicalSkillResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت با موفقیت ساخته شد", status: true }
  }

  return { message: "ساخت مهارت با مشکل مواجه شد", status: false }
}

export const fetchTechnicalSkillCreateInput = async (technicalSkillId: string) =>
  await prisma.technicalSkill.findUnique({
    where: { id: technicalSkillId },
    select: TechnicalSkillCreateInput,
  })

export const updateTechnicalSkillImage = async (
  technicalSkillImageFile: TypeTechnicalSkillForm["image"],
  technicalSkillImageUrl: string
): Promise<TypeReturnSererAction> => {
  if (technicalSkillImageFile?.size) {
    return await updateImage(technicalSkillImageUrl, technicalSkillImageFile)
  }
  return { status: true }
}

export const newTechnicalSkillInfoIsEqual = (
  currentTechnicalSkillInfo: TypeTechnicalSkillFormWithoutImage,
  newTechnicalSkillInfo: TypeTechnicalSkillFormWithoutImage
) => isEqual(currentTechnicalSkillInfo, newTechnicalSkillInfo)

export const saveUpdatedTechnicalSkill = async ({
  technicalSkill,
  reValidPath,
}: TypeSaveUpdatedTechnicalSkillParams): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.technicalSkill.update({
    where: { id: technicalSkill.id },
    data: {
      ...technicalSkill.InfoFormWithoutImage,
      ...(technicalSkill.imageUrl && { image: technicalSkill.imageUrl }),
      projectList: { connect: technicalSkill.relatedProjectList },
    },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت با موفقیت بروزرسانی شد", status: true }
  }

  return { message: "بروزرسانی مهارت با مشکل مواجه شد", status: false }
}

export const fetchTechnicalSkillIdAndImagePath = async (
  technicalSkillId: string
): Promise<TypeTechnicalSkillIdAndImagePath | null> =>
  await prisma.technicalSkill.findUnique({
    where: { id: technicalSkillId },
    select: TechnicalSkillIdAndImagePath,
  })

export const deleteTechnicalSkill = async (technicalSkillId: string) =>
  await prisma.technicalSkill.delete({ where: { id: technicalSkillId } })

export const getExperienceYearTimeTitle = (
  value: experienceYearTime | null | undefined
): string => {
  return value ? experienceYearTimeTitles[value] : ""
}
