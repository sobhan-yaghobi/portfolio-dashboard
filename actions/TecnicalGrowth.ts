"use server"

import prisma from "@/lib/prisma"
import {
  SchemaTechnicalGrowth,
  TypeErrors,
  TypeReturnSererAction,
  TypeTechnicalGrowth,
} from "./definition"
import { revalidatePath } from "next/cache"

const TCGRObject = (formData: FormData) =>
  ({
    order: Number(formData.get("order")),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
  } as TypeTechnicalGrowth)

const orderHandler = async (
  order: number | undefined
): Promise<TypeReturnSererAction & { data: number }> => {
  const technicalGrowths = await prisma.technicalGrowth.findMany()
  if (order && order <= technicalGrowths.length + 1) {
    const technicalUpdateResult = await prisma.technicalGrowth.updateMany({
      where: { order: { gt: order - 1 } },
      data: { order: { increment: 1 } },
    })
    if (technicalUpdateResult) {
      return { status: true, data: order }
    }
    return {
      status: false,
      message: "error insert technical growth",
      data: technicalGrowths.length + 1,
    }
  }
  return { status: true, data: technicalGrowths.length + 1 }
}

export const addTechnicalGrowth = async (
  formData: FormData,
  path: string
): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaTechnicalGrowth.safeParse(TCGRObject(formData))

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const orderResult = await orderHandler(validationResult.data.order)

  if (!orderResult.status) {
    return { message: orderResult.message, status: false }
  }

  const technicalGrowthResult = await prisma.technicalGrowth.create({
    data: { ...validationResult.data, order: orderResult.data },
  })
  if (technicalGrowthResult) {
    revalidatePath(path)
    return { message: "technical growth create, successfully", status: true }
  }

  return { message: "technical growth creation failure", status: false }
}
