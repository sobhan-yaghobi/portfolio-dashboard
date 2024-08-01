import { Prisma, Project, Skill } from "@prisma/client"
import { TypeError, TypeProjectForm, TypeProjectFormWithoutImage } from "../definition"

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
    relatedSkills: Skill[]
  }
  reValidPath: string
}

export type TypeEditProjectFormActionParams = {
  project: {
    id: string
    formData: FormData
    relatedSkills: Skill[]
  }
  reValidPath: string
}

// Action Parameters
export type TypeSetProjectParams = {
  project: {
    infoForm: TypeProjectForm
    relatedSkills: Skill[]
  }
  reValidPath: string
}

export type TypeCreateProjectParams = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedSkills: Skill[]
    imageUrl: string
  }
  reValidPath: string
}

export type TypeSetEditProjectParams = {
  project: {
    id: string
    infoForm: TypeProjectForm
    relatedSkills: Skill[]
  }
  reValidPath: string
}

export type TypeSaveUpdatedProjectParams = {
  project: {
    id: string
    InfoFormWithoutImage: TypeProjectFormWithoutImage
    relatedSkills: Skill[]
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
  skills: Skill[]
  selectionSkills?: Skill[]
}

export type TypeEditProjectComponentProps = {
  id: string
  defaultValues: TypeProjectInput | null
  skills: Skill[]
  selectionSkills?: Skill[]
}

export type TypeProjectFormComponentProps = {
  skills?: Skill[]
  selectedSkills: Skill[]
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>
  defaultValues?: TypeProjectInput | null
  submitText: string
  errors: TypeError
  submitFunction: (formData: FormData) => void | any
}
