import {
  SchemaTechnicalGrowth,
  TypeReturnSererAction,
  TypeTechnicalGrowthForm,
} from "@/lib/definition"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const validateTechnicalGrowthForm = (formData: FormData) =>
  SchemaTechnicalGrowth.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
  } as TypeTechnicalGrowthForm)

export const createTechnicalGrowth = async (
  skillInfoForm: TypeTechnicalGrowthForm,
  technicalGrowthOrder: number,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const technicalGrowthResult = await prisma.technicalGrowth.create({
    data: { ...skillInfoForm, order: technicalGrowthOrder },
  })
  if (technicalGrowthResult) {
    revalidatePath(reValidPath)
    return { message: "Technical Growth create successfully", status: true }
  }

  return { message: "Technical Growth create got failure", status: false }
}
