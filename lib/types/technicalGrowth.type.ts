import { Prisma, TechnicalGrowth } from "@prisma/client"
import { TypeError, TypeTechnicalGrowthForm } from "../definition"

// Technical Growth Types
export type TypeTechnicalGrowthInput = Omit<Prisma.TechnicalGrowthCreateInput, "order">

export const TechnicalGrowthInput: Prisma.TechnicalGrowthSelect = {
  title: true,
  subtitle: true,
  description: true,
}

export type TypeDragAndDropTechnicalGrowth = {
  draggedTechnicalItemFrom: number | null
  draggedTechnicalGrowthTo: number | null
  originalTechnicalGrowthList: TechnicalGrowth[]
}

// Form Action
export type TypeEditTechnicalGrowthFormActionParams = {
  technicalGrowth: {
    id: string
    formData: FormData
  }
  reValidPath: string
}

export type TypeSetEditTechnicalGrowthParams = {
  technicalGrowth: {
    id: string
    infoForm: TypeTechnicalGrowthForm
  }
  reValidPath: string
}

// Actions Parameters
export type TypeCreateTechnicalGrowthParams = {
  technicalGrowth: {
    infoForm: TypeTechnicalGrowthForm
    listCount: number
  }
  reValidPath: string
}

export type TypeSaveUpdatedTechnicalGrowthParams = {
  technicalGrowth: {
    id: string
    infoForm: TypeTechnicalGrowthForm
  }
  reValidPath: string
}

export type TypeUpdateTechnicalGrowthListParams = {
  itemDragged: TechnicalGrowth
  draggedTo: number
  remainingItems: TechnicalGrowth[]
}

// Component Props
export type TypeCreateTechnicalGrowthComponentProps = {
  path: string
}

export type TypeEditTechnicalGrowthComponentProps = {
  id: string
  defaultValues: TypeTechnicalGrowthInput | null
}

export type TypeTechnicalGrowthFormComponentProps = {
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
  defaultValues?: TypeTechnicalGrowthInput | null
}

export type TypeTechnicalGrowthTimeLineProps = {
  technicalGrowthList: TechnicalGrowth[]
}
