import { Prisma } from "@prisma/client"

export type TypeProjectInput = Prisma.ProjectCreateInput
export const ProjectCreateInput: Prisma.ProjectSelect = {
  image: true,
  title: true,
  link: true,
  source: true,
  description: true,
}

export type TypeSkillInput = Prisma.SkillsCreateInput
export const SkillCreateInput: Prisma.SkillsSelect = {
  name: true,
  image: true,
  projects: true,
  link: true,
  description: true,
}

export type TypeTechnicalGrowth = Prisma.TechnicalGrowthCreateInput
export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}
