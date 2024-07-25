import { Prisma } from "@prisma/client"

export type TypeAdminProfile = Omit<Prisma.AdminCreateInput, "password">
export const AdminProfileInput: Prisma.AdminSelect = {
  name: true,
  phone: true,
  email: true,
  location: true,
  bio: true,
  image: true,
}

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
  link: true,
  description: true,
}

export type TypeTechnicalGrowth = Prisma.TechnicalGrowthCreateInput
export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}
