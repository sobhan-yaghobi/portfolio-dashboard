import { experienceYearTime, Prisma, Project, TechnicalSkill } from "@prisma/client"
import {
  TypeTechnicalSkillForm,
  TypeTechnicalSkillFormWithoutImage,
} from "../schema/technicalSkill.schema"
import { TypeError } from "./utils.type"

// TechnicalSkill Types
export type TypeTechnicalSkillInput = Prisma.TechnicalSkillCreateInput

export const TechnicalSkillCreateInput: Prisma.TechnicalSkillSelect = {
  name: true,
  image: true,
  link: true,
  description: true,
  experienceYearTime: true,
}

export type TypeTechnicalSkillIdAndImagePath = Pick<TechnicalSkill, "id" | "image">

export const TechnicalSkillIdAndImagePath: Prisma.TechnicalSkillSelect = {
  id: true,
  image: true,
}

// Form Action
export type TypeCreateTechnicalSkillFormActionParams = {
  technicalSkill: {
    formData: FormData
    relatedProjectList: Project[]
  }
  reValidPath: string
}

export type TypeEditTechnicalSkillFormActionParams = {
  technicalSkill: {
    id: string
    formData: FormData
    relatedProjectList: Project[]
  }
  reValidPath: string
}

// Action Parameters
export type TypeSetTechnicalSkillParams = {
  technicalSkill: {
    infoForm: TypeTechnicalSkillForm
    relatedProjectList: Project[]
  }
  reValidPath: string
}

export type TypeCreateTechnicalSkillParams = {
  technicalSkill: {
    id: string
    infoForm: TypeTechnicalSkillForm
    relatedProjectList: Project[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSetEditTechnicalSkillParams = {
  technicalSkill: { id: string; infoForm: TypeTechnicalSkillForm; relatedProjectList: Project[] }
  reValidPath: string
}

export type TypeSaveUpdatedTechnicalSkillParams = {
  technicalSkill: {
    id: string
    InfoFormWithoutImage: TypeTechnicalSkillFormWithoutImage
    relatedProjectList: Project[]
  }
  reValidPath: string
}

export type TypeSetDeleteTechnicalSkillParams = {
  technicalSkill: {
    id: string
    image: string
  }
  reValidPath: string
}

// Components Props
export type TypeCreateTechnicalSkillComponentProps = {
  projectList: Project[]
  selectionProjectList?: Project[]
}

export type TypeEditTechnicalSkillListComponentProps = {
  id: string
  defaultValues: TypeTechnicalSkillInput | null
  projectList: Project[]
  selectionProjectList?: Project[]
}

export type TypeTechnicalSkillFormComponentProps = {
  projectList?: Project[]
  selectedProjectList: Project[]
  setSelectedProjectList: React.Dispatch<React.SetStateAction<Project[]>>
  defaultValues?: TypeTechnicalSkillInput | null
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
}
