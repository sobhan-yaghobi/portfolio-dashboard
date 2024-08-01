import prisma from "@/lib/prisma"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"

import {
  TechnicalGrowthInput,
  TypeCreateTechnicalGrowthParams,
  TypeSaveUpdatedTechnicalGrowthParams,
} from "@/lib/types/technicalGrowth.type"
import { TechnicalGrowth } from "@prisma/client"
import {
  SchemaTechnicalGrowth,
  TypeReturnSererAction,
  TypeTechnicalGrowthForm,
} from "@/lib/definition"

export const validateTechnicalGrowthForm = (formData: FormData) =>
  SchemaTechnicalGrowth.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
  } as TypeTechnicalGrowthForm)

export const createTechnicalGrowth = async ({
  technicalGrowth,
  reValidPath,
}: TypeCreateTechnicalGrowthParams): Promise<TypeReturnSererAction> => {
  const technicalGrowthResult = await prisma.technicalGrowth.create({
    data: { ...technicalGrowth.infoForm, order: technicalGrowth.listCount },
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

export const saveUpdatedTechnicalGrowth = async ({
  technicalGrowth,
  reValidPath,
}: TypeSaveUpdatedTechnicalGrowthParams): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.technicalGrowth.update({
    where: { id: technicalGrowth.id },
    data: { ...technicalGrowth.infoForm },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Technical Growth updated successfully", status: true }
  }

  return { message: "Technical Growth update failed", status: false }
}

export const setNewOrderTechnicalGrowthList = (technicalGrowths: TechnicalGrowth[]) =>
  technicalGrowths.map((tech, index) => ({ ...tech, order: index }))

export const updateTechnicalGrowthOrder = async ({ id, order }: TechnicalGrowth) =>
  await prisma.technicalGrowth.update({
    where: { id },
    data: {
      order,
    },
  })

export const isTechnicalGrowthExist = async (technicalGrowthId: string) =>
  Boolean(await prisma.technicalGrowth.findMany({ where: { id: technicalGrowthId } }))

export const deleteTechnicalGrowth = async (technicalGrowthId: string) =>
  await prisma.technicalGrowth.delete({ where: { id: technicalGrowthId } })
