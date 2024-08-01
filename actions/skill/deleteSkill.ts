"use server"

import { revalidatePath } from "next/cache"
import { deleteSkill, fetchSkillIdAndImagePath } from "./skillUtils"

import { TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeSetDeleteSkillParams } from "@/lib/types/skill.type"

import { deleteImage } from "../image"

export const deleteSkillFormAction = async (
  skillId: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const skillInfo = await fetchSkillIdAndImagePath(skillId)

  if (skillInfo) return setDeleteSkill({ skill: skillInfo, reValidPath })

  return { message: "Skill remove got failure", status: false }
}

const setDeleteSkill = async ({
  skill,
  reValidPath,
}: TypeSetDeleteSkillParams): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImage(skill.image)
  const deleteSkillResult = await deleteSkill(skill.id)

  if (deleteImageResult.status && deleteSkillResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Skill remove successfully" }
  }

  return { message: "Remove skill got failure", status: false }
}
