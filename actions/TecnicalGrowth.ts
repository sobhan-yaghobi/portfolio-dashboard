"use server"

import prisma from "@/lib/prisma"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"

import {
  SchemaTechnicalGrowth,
  TypeErrors,
  TypeReturnSererAction,
  TypeTechnicalGrowth,
} from "./definition"
import { TechnicalGrowthInput } from "@/lib/types"
import { TechnicalGrowth } from "@prisma/client"

const TCGRObject = (formData: FormData) =>
  ({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
  } as TypeTechnicalGrowth)

export const addTechnicalGrowth = async (
  formData: FormData,
  path: string
): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaTechnicalGrowth.safeParse(TCGRObject(formData))

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const technicalGrowthLengths = await prisma.technicalGrowth.count()
  const technicalGrowthResult = await prisma.technicalGrowth.create({
    data: { ...validationResult.data, order: technicalGrowthLengths },
  })
  if (technicalGrowthResult) {
    revalidatePath(path)
    return { message: "technical growth create, successfully", status: true }
  }

  return { message: "technical growth creation failure", status: false }
}

export const editTechnicalGrowth = async (
  id: string,
  formData: FormData,
  path: string
): Promise<TypeReturnSererAction> => {
  const technicalGrowth = TCGRObject(formData)
  const validationResult = SchemaTechnicalGrowth.safeParse(technicalGrowth)

  if (validationResult.success) {
    const technicalGrowthResult = await prisma.technicalGrowth.findUnique({
      where: { id },
      select: TechnicalGrowthInput,
    })
    if (technicalGrowthResult) {
      if (!isEqual(technicalGrowthResult, technicalGrowth)) {
        const updateResult = await prisma.technicalGrowth.update({
          where: { id },
          data: technicalGrowth,
        })
        if (updateResult) {
          revalidatePath(path)
          return { message: "technical growth update successfully", status: true }
        }
        return { message: "update is got failure", status: false }
      }
      return { message: "please update the technical growth field first !", status: false }
    }
    return { message: "technical growth not found", status: false }
  }

  return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

export const editOrder = async (
  newTechs: TechnicalGrowth[],
  path: string
): Promise<TypeReturnSererAction> => {
  const techsWithNewOrder = newTechs.map((tech, index) => ({ ...tech, order: index }))
  try {
    for (const object of techsWithNewOrder) {
      await prisma.technicalGrowth.update({
        where: { id: object.id },
        data: {
          order: object.order,
        },
      })
    }
    revalidatePath(path)
    return { message: "update orders successfully", status: true }
  } catch (_) {
    return { message: "update orders failure", status: false }
  }
}

export const deleteTechnicalGrowth = async (id: string, path: string) => {
  const deleteResult = await prisma.technicalGrowth.delete({ where: { id } })
  if (deleteResult) {
    revalidatePath(path)
    return { message: "technical growth removed successfully", status: true }
  }
  return { message: "technical growth remove got failure", status: false }
}
