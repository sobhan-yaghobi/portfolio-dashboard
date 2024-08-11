import prisma from "@/lib/prisma"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"

import { SchemaSoftSkill, TypeSoftSkillForm } from "@/lib/schema/softSkill.schema"
import { TypeReturnSererAction } from "@/lib/types/utils.type"
import {
  TypeSaveUpdatedSoftSkillParams,
  TypeSetSoftSkillParams,
  TypeSoftSkillInput,
} from "@/lib/types/softSkill.type"

export const validateSoftSkillForm = (formData: FormData) =>
  SchemaSoftSkill.safeParse({
    name: formData.get("name"),
    score: Number(formData.get("score")),
  } as TypeSoftSkillForm)

export const createSoftSkill = async ({
  softSkill,
  reValidPath,
}: TypeSetSoftSkillParams): Promise<TypeReturnSererAction> => {
  const createSoftSkillResult = await prisma.softSkill.create({ data: softSkill.infoForm })

  if (createSoftSkillResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت نرم با موفقیت ساخته شد", status: true }
  }

  return { message: "ساخت مهارت نرم با مشکل مواجه شد", status: false }
}

export const isSoftSkillExist = (softSkillId: string) =>
  !!prisma.softSkill.findMany({ where: { id: softSkillId } })

export const deleteSoftSkill = async (softSkillId: string) =>
  await prisma.softSkill.delete({ where: { id: softSkillId } })

export const fetchSoftSkill = async (softSkillId: string) =>
  await prisma.softSkill.findUnique({ where: { id: softSkillId } })

export const newSoftSkillInfoIsEqual = (
  currentSoftSkillInfo: TypeSoftSkillInput,
  newSoftSkillInfo: TypeSoftSkillInput
) => isEqual(currentSoftSkillInfo, newSoftSkillInfo)

export const saveUpdatedSoftSkill = async ({
  softSkill,
  reValidPath,
}: TypeSaveUpdatedSoftSkillParams): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.softSkill.update({
    where: { id: softSkill.id },
    data: {
      ...softSkill.infoForm,
    },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "مهارت نرم با موفقیت بروزرسانی شد", status: true }
  }

  return { message: "بروزرسانی مهارت نرم با مشکل مواجه شد", status: false }
}
