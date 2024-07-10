import { Prisma } from "@prisma/client"

export type TypeProjectInput = Prisma.ProjectCreateInput
export const ProjectCreateInput: Prisma.ProjectSelect = {
  image: true,
  title: true,
  link: true,
  source: true,
  description: true,
}

export type TypeSkillsInput = Prisma.SkillsCreateInput
export const SkillsCreateInput: Prisma.SkillsSelect = {
  name: true,
  image: true,
  projects: true,
  link: true,
  description: true,
}
