import { Prisma, Project, Skill } from "@prisma/client"
import { TypeSkillForm, TypeSkillFormWithoutImage } from "../schema/skill.schema"
import { TypeError } from "./utils.type"

// Skill Types
export type TypeSkillInput = Prisma.SkillCreateInput

export const SkillCreateInput: Prisma.SkillSelect = {
  name: true,
  image: true,
  link: true,
  description: true,
}

export type TypeSkillIdAndImagePath = Pick<Skill, "id" | "image">

export const SkillIdAndImagePath: Prisma.SkillSelect = { id: true, image: true }

// Form Action
export type TypeCreateSkillFormActionParams = {
  skill: {
    formData: FormData
    relatedProjects: Project[]
  }
  reValidPath: string
}

export type TypeEditSkillFormActionParams = {
  skill: {
    id: string
    formData: FormData
    relatedProjects: Project[]
  }
  reValidPath: string
}

// Action Parameters
export type TypeSetSkillParams = {
  skill: {
    infoForm: TypeSkillForm
    relatedProjects: Project[]
  }
  reValidPath: string
}

export type TypeCreateSkillParams = {
  skill: {
    id: string
    infoForm: TypeSkillForm
    relatedProjects: Project[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSetEditSkillParams = {
  skill: { id: string; infoForm: TypeSkillForm; relatedProjects: Project[] }
  reValidPath: string
}

export type TypeSaveUpdatedSkillParams = {
  skill: {
    id: string
    InfoFormWithoutImage: TypeSkillFormWithoutImage
    relatedProjects: Project[]
  }
  reValidPath: string
}

export type TypeSetDeleteSkillParams = {
  skill: {
    id: string
    image: string
  }
  reValidPath: string
}

// Components Props
export type TypeCreateSkillComponentProps = {
  projects: Project[]
  selectionProjects?: Project[]
}

export type TypeEditSkillsComponentProps = {
  id: string
  defaultValues: TypeSkillInput | null
  projects: Project[]
  selectionProjects?: Project[]
}

export type TypeSkillFormComponentProps = {
  projects?: Project[]
  selectedProjects: Project[]
  setSelectedProjects: React.Dispatch<React.SetStateAction<Project[]>>
  defaultValues?: TypeSkillInput | null
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
}
