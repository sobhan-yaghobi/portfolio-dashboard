import { Admin, Prisma, Project, Skills } from "@prisma/client"
import { TypeSkillForm } from "./definition"

export type TypeAdminProfile = Omit<Prisma.AdminCreateInput, "password">
export const AdminProfileInput: Prisma.AdminSelect = {
  name: true,
  phone: true,
  email: true,
  location: true,
  bio: true,
  image: true,
}

export type TypePasswordAdminInput = Pick<Admin, "password" | "id">
export const PasswordAdminInput: Prisma.AdminSelect = {
  password: true,
  id: true,
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
export type TypeSkillIdAndImagePath = Pick<Skills, "id" | "image">
export const SkillIdAndImagePath: Prisma.SkillsSelect = { id: true, image: true }

export type TypeCreateSkillParam = {
  skill: {
    id: string
    infoForm: TypeSkillForm
    relatedProjects: Project[]
    imagePath: string
  }
  reValidPath: string
}

export type TypeTechnicalGrowth = Prisma.TechnicalGrowthCreateInput
export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}
