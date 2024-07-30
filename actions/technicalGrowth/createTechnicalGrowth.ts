"use server"

import prisma from "@/lib/prisma"
import { createTechnicalGrowth, validateTechnicalGrowthForm } from "./technicalGrowthUtils"

import { TypeErrors, TypeReturnSererAction, TypeTechnicalGrowthForm } from "@/lib/definition"

export const addTechnicalGrowthFormAction = async (
  formData: FormData,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateTechnicalGrowthForm(formData)

  if (validateResult.success) return setTechnicalGrowth(validateResult.data, reValidPath)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const setTechnicalGrowth = async (
  technicalGrowthInfoForm: TypeTechnicalGrowthForm,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const technicalGrowthListCount = await prisma.technicalGrowth.count()

  const createTechnicalGrowthResult = await createTechnicalGrowth(
    technicalGrowthInfoForm,
    technicalGrowthListCount,
    reValidPath
  )

  if (createTechnicalGrowthResult.status) return createTechnicalGrowthResult

  return { message: "technical growth creation failure", status: false }
}
