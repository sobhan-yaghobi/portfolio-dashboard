import { Prisma, Project, TechnicalSkill } from "@prisma/client"
import { TypeProjectForm, TypeProjectFormWithoutImage } from "../schema/project.schema"
import { TypeError } from "./utils.type"

// Project Types
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

// Form Action
export type TypeCreateProjectFormActionParams = {
  project: {
    formData: FormData
    relatedTechnicalSkillList: TechnicalSkill[]
  }
  reValidPath: string
}

export type TypeEditProjectFormActionParams = {
  project: {
    id: string
    formData: FormData
    relatedTechnicalSkillList: TechnicalSkill[]
  }
  reValidPath: string
}

// Action Parameters
export type TypeSetProjectParams = {
  project: {
    infoForm: TypeProjectForm
    relatedTechnicalSkillList: TechnicalSkill[]
  }
  reValidPath: string
}

export type TypeCreateProjectParams = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedTechnicalSkillList: TechnicalSkill[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSetEditProjectParams = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedTechnicalSkillList: TechnicalSkill[]
  }
  reValidPath: string
}

export type TypeSaveUpdatedProjectParams = {
  project: {
    id: string
    InfoFormWithoutImage: TypeProjectFormWithoutImage
    relatedTechnicalSkillList: TechnicalSkill[]
    imageUrl?: string
  }
  reValidPath: string
}

export type TypeSetDeleteProjectParams = {
  project: {
    id: string
    image: string
  }
  reValidPath: string
}

// Component Props
export type TypeCreateProjectComponentProps = {
  technicalSkillList: TechnicalSkill[]
  selectionTechnicalSkillList?: TechnicalSkill[]
}

export type TypeEditProjectComponentProps = {
  id: string
  defaultValues: TypeProjectInput | null
  technicalSkillList: TechnicalSkill[]
  selectionTechnicalSkillList?: TechnicalSkill[]
}

export type TypeProjectFormComponentProps = {
  technicalSkillList?: TechnicalSkill[]
  selectedTechnicalSkillList: TechnicalSkill[]
  setSelectedTechnicalSkillList: React.Dispatch<React.SetStateAction<TechnicalSkill[]>>
  defaultValues?: TypeProjectInput | null
  submitText: string
  errors: TypeError
  submitFunction: (formData: FormData) => void | any
}
