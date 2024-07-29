import {
  SchemaProject,
  SchemaSkill,
  TypeProjectForm,
  TypeProjectFormWithoutImage,
  TypeReturnSererAction,
} from "@/lib/definition"
import { createImage, updateImage } from "../image"
import { ProjectCreateInput, TypeCreateProjectParam } from "@/lib/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isEqual } from "lodash"
import { Skill } from "@prisma/client"

export const validateProjectForm = (formData: FormData) =>
  SchemaProject.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    link: formData.get("link"),
    source: formData.get("source"),
    description: formData.get("description"),
  } as TypeProjectForm)

export const setImageProject = async (
  projectId: string,
  projectImageFile: TypeProjectForm["image"]
) => {
  if (!projectImageFile || !projectImageFile.size) {
    return imageIsRequired()
  }

  return await createImage(projectId, projectImageFile)
}

export const imageIsRequired = (): TypeReturnSererAction => ({
  message: "Image is required",
  status: false,
})

export const createProject = async ({
  project,
  reValidPath,
}: TypeCreateProjectParam): Promise<TypeReturnSererAction> => {
  const projectResult = await prisma.project.create({
    data: {
      ...project.infoForm,
      id: project.id,
      image: project.imagePath,
      skills: { connect: project.relatedSkills || [] },
    },
  })

  if (projectResult) {
    revalidatePath(reValidPath)
    return { message: "Project create, successfully", status: true }
  }

  return { message: "Project create failure", status: false }
}

export const fetchProjectCreateInput = async (projectId: string) =>
  await prisma.project.findUnique({ where: { id: projectId }, select: ProjectCreateInput })

export const updateProjectImage = async (
  projectImageFile: TypeProjectForm["image"],
  projectImagePath: string
): Promise<TypeReturnSererAction> => {
  if (projectImageFile?.size) {
    return await updateImage(projectImagePath, projectImageFile)
  }
  return { status: true }
}

export const newProjectInfoIsEqual = (
  currentProjectInfo: TypeProjectFormWithoutImage,
  newProjectInfo: TypeProjectFormWithoutImage
) => isEqual(currentProjectInfo, newProjectInfo)

export const saveUpdatedProject = async (
  projectId: string,
  projectInfoFormWithoutImage: TypeProjectFormWithoutImage,
  relatedSkills: Skill[],
  reValidPath: string
): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.project.update({
    where: { id: projectId },
    data: { ...projectInfoFormWithoutImage, skills: { connect: relatedSkills } },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Project updated successfully", status: true }
  }

  return { message: "Project update failed", status: false }
}
