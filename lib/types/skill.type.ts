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
    relatedProjectList: Project[]
  }
  reValidPath: string
}

export type TypeEditSkillFormActionParams = {
  skill: {
    id: string
    formData: FormData
    relatedProjectList: Project[]
  }
  reValidPath: string
}

// Action Parameters
export type TypeSetSkillParams = {
  skill: {
    infoForm: TypeSkillForm
    relatedProjectList: Project[]
  }
  reValidPath: string
}

export type TypeCreateSkillParams = {
  skill: {
    id: string
    infoForm: TypeSkillForm
    relatedProjectList: Project[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSetEditSkillParams = {
  skill: { id: string; infoForm: TypeSkillForm; relatedProjectList: Project[] }
  reValidPath: string
}

export type TypeSaveUpdatedSkillParams = {
  skill: {
    id: string
    InfoFormWithoutImage: TypeSkillFormWithoutImage
    relatedProjectList: Project[]
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
  selectionProjectList?: Project[]
}

export type TypeEditSkillsComponentProps = {
  id: string
  defaultValues: TypeSkillInput | null
  projects: Project[]
  selectionProjectList?: Project[]
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
