import { Prisma } from "@prisma/client"

export type TypeProjectInput = Prisma.ProjectCreateInput
export const ProjectCreateInput: Prisma.ProjectSelect = {
  image: true,
  title: true,
  link: true,
  source: true,
  description: true,
}

export type TypeSkillInput = Prisma.SkillCreateInput
export const SkillCreateInput: Prisma.SkillsSelect = {
  name: true,
  image: true,
  projects: true,
  link: true,
  description: true,
}
