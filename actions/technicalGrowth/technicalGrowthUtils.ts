import {
  SchemaTechnicalGrowth,
  TypeReturnSererAction,
  TypeTechnicalGrowthForm,
} from "@/lib/definition"
import prisma from "@/lib/prisma"
import { TechnicalGrowthInput } from "@/lib/types"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"

export const validateTechnicalGrowthForm = (formData: FormData) =>
  SchemaTechnicalGrowth.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
  } as TypeTechnicalGrowthForm)

export const createTechnicalGrowth = async (
  technicalGrowthInfoForm: TypeTechnicalGrowthForm,
  technicalGrowthOrder: number,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const technicalGrowthResult = await prisma.technicalGrowth.create({
    data: { ...technicalGrowthInfoForm, order: technicalGrowthOrder },
  })
  if (technicalGrowthResult) {
    revalidatePath(reValidPath)
    return { message: "Technical Growth create successfully", status: true }
  }

  return { message: "Technical Growth create got failure", status: false }
}

export const fetchTechnicalCreateInput = async (technicalGrowthId: string) =>
  await prisma.technicalGrowth.findUnique({
    where: { id: technicalGrowthId },
    select: TechnicalGrowthInput,
  })

export const newTechnicalGrowthInfoIsEqual = (
  currentTechnicalGrowthInfo: TypeTechnicalGrowthForm,
  newTechnicalGrowthInfo: TypeTechnicalGrowthForm
) => isEqual(currentTechnicalGrowthInfo, newTechnicalGrowthInfo)

export const saveUpdatedTechnicalGrowth = async (
  technicalGrowthId: string,
  technicalGrowthInfoForm: TypeTechnicalGrowthForm,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.technicalGrowth.update({
    where: { id: technicalGrowthId },
    data: { ...technicalGrowthInfoForm },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Technical Growth updated successfully", status: true }
  }

  return { message: "Technical Growth update failed", status: false }
}
