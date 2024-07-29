"use server"

import { revalidatePath } from "next/cache"
import { deleteImageFromBucket, deleteProject, fetchProjectIdAndImagePath } from "./projectUtils"

import { TypeReturnSererAction } from "@/lib/definition"
import { TypeProjectIdAndImagePath } from "@/lib/types"

export const deleteProjectFormAction = async (
  project: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const projectInfo = await fetchProjectIdAndImagePath(project)

  if (projectInfo) return setDeleteProject(projectInfo, reValidPath)

  return { message: "Project not found", status: false }
}

const setDeleteProject = async (
  { id, image }: TypeProjectIdAndImagePath,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImageFromBucket(image)
  const deleteProjectResult = await deleteProject(id)

  if (deleteImageResult.status && deleteProjectResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Project remove successfully" }
  }

  return { message: "Remove project got failure", status: false }
}
