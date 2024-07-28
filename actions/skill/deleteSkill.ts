"use server"

import { revalidatePath } from "next/cache"

import { TypeReturnSererAction } from "@/lib/definition"
import { deleteImageFromBucket, deleteSkill, fetchSkillIdAndImagePath } from "./skillUtils"
import { TypeSkillIdAndImagePath } from "@/lib/types"

export const deleteSkillFormAction = async (
  skillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const skillInfo = await fetchSkillIdAndImagePath(skillId)

  if (skillInfo) return setDeleteSkill(skillInfo, reValidPath)

  return { message: "Project remove got failure", status: false }
}

const setDeleteSkill = async (
  { id, image }: TypeSkillIdAndImagePath,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImageFromBucket(image)
  const deleteSkillResult = await deleteSkill(id)

  if (deleteImageResult.status && deleteSkillResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Skill remove successfully" }
  }

  return { message: "Remove skill got failure", status: false }
}
