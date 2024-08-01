"use server"

import { revalidatePath } from "next/cache"
import { deleteProject, fetchProjectIdAndImagePath } from "./projectUtils"
import { deleteImage } from "../image"

import { TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeSetDeleteProjectParams } from "@/lib/types/project.type"

export const deleteProjectFormAction = async (
  project: string,
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const projectInfo = await fetchProjectIdAndImagePath(project)

  if (projectInfo) return setDeleteProject({ project: projectInfo, reValidPath })

  return { message: "Project not found", status: false }
}

const setDeleteProject = async ({
  project,
  reValidPath,
}: TypeSetDeleteProjectParams): Promise<TypeReturnSererAction> => {
  const deleteImageResult = await deleteImage(project.image)
  const deleteProjectResult = await deleteProject(project.id)

  if (deleteImageResult.status && deleteProjectResult) {
    revalidatePath(reValidPath)
    return { status: true, message: "Project remove successfully" }
  }

  return { message: "Remove project got failure", status: false }
}
