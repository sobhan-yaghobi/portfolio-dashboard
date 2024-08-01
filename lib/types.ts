import { Admin, Prisma, Project, Skill, TechnicalGrowth } from "@prisma/client"
import {
  TypeAdminProfileFrom,
  TypeAdminProfileFromWithoutImage,
  TypeError,
  TypeProjectForm,
  TypeProjectFormWithoutImage,
  TypeReturnSererAction,
  TypeSkillForm,
  TypeSkillFormWithoutImage,
  TypeTechnicalGrowthForm,
} from "./definition"

// export type TypeAdminProfile = Omit<Prisma.AdminCreateInput, "password">
// export const AdminProfileInput: Prisma.AdminSelect = {
//   name: true,
//   phone: true,
//   email: true,
//   location: true,
//   bio: true,
//   image: true,
// }
// export type TypeEditProfileFormActionParam = {
//   formData: FormData
//   reValidPath: string
// }
// export type ProfileComponentProps = {
//   defaultValues?: TypeAdminProfile | null
// }
// export type TypeSetProfileParam = {
//   infoForm: TypeAdminProfileFrom
//   reValidPath: string
// }
// export type TypeUpdateAdminParam = {
//   admin: {
//     id: string
//     infoFormWithoutImage: TypeAdminProfileFromWithoutImage
//   }
//   reValidPath: string
// }

// export type TypePasswordAdminInput = Pick<Admin, "password" | "id">
// export const PasswordAdminInput: Prisma.AdminSelect = {
//   password: true,
//   id: true,
// }

// export type TypeProjectInput = Prisma.ProjectCreateInput
// export const ProjectCreateInput: Prisma.ProjectSelect = {
//   image: true,
//   title: true,
//   link: true,
//   source: true,
//   description: true,
// }
// export type TypeProjectIdAndImagePath = Pick<Project, "id" | "image">
// export const ProjectIdAndImagePath: Prisma.ProjectSelect = { id: true, image: true }
// export type TypeCreateProjectParam = {
//   project: {
//     id: string
//     infoForm: TypeProjectForm
//     relatedSkills: Skill[]
//     imageUrl: string
//   }
//   reValidPath: string
// }
// export type TypeEditProjectFormActionParam = {
//   project: {
//     id: string
//     formData: FormData
//     relatedSkills: Skill[]
//   }
//   reValidPath: string
// }
// export type TypeSetEditProjectParam = {
//   project: {
//     id: string
//     infoForm: TypeProjectForm
//     relatedSkills: Skill[]
//   }
//   reValidPath: string
// }
// export type TypeSaveUpdatedProjectParam = {
//   project: {
//     id: string
//     InfoFormWithoutImage: TypeProjectFormWithoutImage
//     relatedSkills: Skill[]
//     imageUrl?: string
//   }
//   reValidPath: string
// }
// export type CreateProjectComponentProps = {
//   skills: Skill[]
//   selectionSkills?: Skill[]
// }
// export type EditProjectComponentProps = {
//   id: string
//   defaultValues: TypeProjectInput | null
//   skills: Skill[]
//   selectionSkills?: Skill[]
// }

// export type ProjectFormComponentProps = {
//   skills?: Skill[]
//   selectedSkills: Skill[]
//   setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>
//   defaultValues?: TypeProjectInput | null
//   submitText: string
//   errors: TypeError
//   submitFunction: (formData: FormData) => void | any
// }

// export type TypeSkillInput = Prisma.SkillCreateInput
// export const SkillCreateInput: Prisma.SkillSelect = {
//   name: true,
//   image: true,
//   link: true,
//   description: true,
// }
// export type TypeSkillIdAndImagePath = Pick<Skill, "id" | "image">
// export const SkillIdAndImagePath: Prisma.SkillSelect = { id: true, image: true }

// export type TypeCreateSkillParam = {
//   skill: {
//     id: string
//     infoForm: TypeSkillForm
//     relatedProjects: Project[]
//     imageUrl: string
//   }
//   reValidPath: string
// }
// export type TypeEditSkillFormActionParma = {
//   skill: {
//     id: string
//     formData: FormData
//     relatedProjects: Project[]
//   }
//   reValidPath: string
// }
// export type TypeSaveUpdatedSkillParam = {
//   skill: {
//     id: string
//     InfoFormWithoutImage: TypeSkillFormWithoutImage
//     relatedProjects: Project[]
//   }
//   reValidPath: string
// }
// export type TypeSetEditSkillParam = {
//   skill: { id: string; infoForm: TypeSkillForm; relatedProjects: Project[] }
//   reValidPath: string
// }
// export type CreateSkillComponentProps = {
//   projects: Project[]
//   selectionProjects?: Project[]
// }
// export type EditSkillsComponentProps = {
//   id: string
//   defaultValues: TypeSkillInput | null
//   projects: Project[]
//   selectionProjects?: Project[]
// }
// export type SkillFormComponentProps = {
//   projects?: Project[]
//   selectedProjects: Project[]
//   setSelectedProjects: React.Dispatch<React.SetStateAction<Project[]>>
//   defaultValues?: TypeSkillInput | null
//   submitText: string
//   submitFunction: (formData: FormData) => void | any
//   errors: TypeError
// }

export type TypeTechnicalGrowthInput = Omit<Prisma.TechnicalGrowthCreateInput, "order">
export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}

export type TypeEditTechnicalGrowthFormActionParam = {
  technicalGrowth: {
    id: string
    formData: FormData
  }
  reValidPath: string
}
export type TypeSetEditTechnicalGrowthParam = {
  technicalGrowth: {
    id: string
    InfoForm: TypeTechnicalGrowthForm
  }
  reValidPath: string
}

export type CreateTechnicalGrowthComponentProps = {
  path: string
}
export type EditTechnicalGrowthComponentProps = {
  id: string
  defaultValues: TypeTechnicalGrowthInput | null
}
export type TechnicalGrowthFormComponentProps = {
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
  defaultValues?: TypeTechnicalGrowthInput | null
}
export type TechnicalGrowthTimeLineProps = {
  technicalGrowthList: TechnicalGrowth[]
}

export type TypeDragAndDropTechnicalGrowth = {
  draggedTechnicalItemFrom: number | null
  draggedTechnicalGrowthTo: number | null
  originalTechnicalGrowthList: TechnicalGrowth[]
}
export type TypeUpdateTechnicalGrowthListParam = {
  itemDragged: TechnicalGrowth
  draggedTo: number
  remainingItems: TechnicalGrowth[]
}

export type TypeUploadImageParam = {
  image: {
    file: File
    path: string
  }
  bucket: string
}

export type TypeShowActionReturnMessageParam = {
  actionResult: TypeReturnSererAction
  functions?: {
    doActionIfTrue?: () => void
    doActionIfFalse?: () => void
  }
}
