import { Admin, Prisma, Project, Skill, TechnicalGrowth } from "@prisma/client"
import { TypeProjectForm, TypeSkillForm } from "./definition"

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
export type TypeProjectIdAndImagePath = Pick<Project, "id" | "image">
export const ProjectIdAndImagePath: Prisma.ProjectSelect = { id: true, image: true }

export type TypeCreateProjectParam = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedSkills: Skill[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSkillInput = Prisma.SkillCreateInput
export const SkillCreateInput: Prisma.SkillSelect = {
  name: true,
  image: true,
  link: true,
  description: true,
}
export type TypeSkillIdAndImagePath = Pick<Skill, "id" | "image">
export const SkillIdAndImagePath: Prisma.SkillSelect = { id: true, image: true }

export type TypeCreateSkillParam = {
  skill: {
    id: string
    infoForm: TypeSkillForm
    relatedProjects: Project[]
    imagePath: string
  }
  reValidPath: string
}

export type TypeTechnicalGrowthInput = Prisma.TechnicalGrowthCreateInput
export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}
