import {
  SchemaProject,
  SchemaSkill,
  TypeProjectForm,
  TypeReturnSererAction,
} from "@/lib/definition"
import { createImage } from "../image"
import { TypeCreateProjectParam } from "@/lib/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

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
