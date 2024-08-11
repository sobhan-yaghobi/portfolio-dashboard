import { Prisma } from "@prisma/client"
import { TypeSoftSkillForm } from "../schema/softSkill.schema"
import { TypeError } from "./utils.type"

export type TypeSoftSkillInput = Prisma.SoftSkillCreateInput

export const SoftSkillCreateInput: Prisma.SoftSkillSelect = {
  name: true,
  score: true,
}

export type TypeCreateSoftSkillFormAction = {
  softSkill: {
    formData: FormData
  }
  reValidPath: string
}

export type TypeSetSoftSkillParams = {
  softSkill: {
    infoForm: TypeSoftSkillForm
  }
  reValidPath: string
}

export type TypeEditSoftSkillFormActionParams = {
  softSkill: {
    id: string
    formData: FormData
  }
  reValidPath: string
}

export type TypeSetEditSoftSkillParams = {
  softSkill: {
    id: string
    infoForm: TypeSoftSkillForm
  }
  reValidPath: string
}

export type TypeSaveUpdatedSoftSkillParams = {
  softSkill: {
    id: string
    infoForm: TypeSoftSkillForm
  }
  reValidPath: string
}

export type TypeSoftSkillFormComponentProps = {
  defaultValues?: TypeSoftSkillInput | null
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
}
