"use server"

import prisma from "@/lib/prisma"
import { createTechnicalGrowth, validateTechnicalGrowthForm } from "./technicalGrowthUtils"

import { TypeTechnicalGrowthForm } from "@/lib/schema/technicalGrwoth.schema"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"

export const createTechnicalGrowthFormAction = async (
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

  const createTechnicalGrowthResult = await createTechnicalGrowth({
    technicalGrowth: {
      infoForm: technicalGrowthInfoForm,
      listCount: technicalGrowthListCount,
    },
    reValidPath,
  })

  if (createTechnicalGrowthResult.status) return createTechnicalGrowthResult

  return { message: "ساخت رشد فنی با مشکل مواجه شد", status: false }
}
