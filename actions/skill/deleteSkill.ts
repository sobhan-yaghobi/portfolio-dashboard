"use server"

import { revalidatePath } from "next/cache"
import { deleteSkill, fetchSkillIdAndImagePath } from "./skillUtils"
import { deleteImage } from "../image"

import { TypeReturnSererAction } from "@/lib/definition"
import { TypeSkillIdAndImagePath } from "@/lib/types"

export const deleteSkillFormAction = async (
  skillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const skillInfo = await fetchSkillIdAndImagePath(skillId)

  if (skillInfo) return setDeleteSkill(skillInfo, reValidPath)

  return { message: "Skill remove got failure", status: false }
}

const setDeleteSkill = async (
  { id, image }: TypeSkillIdAndImagePath,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImage(image)
  const deleteSkillResult = await deleteSkill(id)

  if (deleteImageResult.status && deleteSkillResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Skill remove successfully" }
  }

  return { message: "Remove skill got failure", status: false }
}
