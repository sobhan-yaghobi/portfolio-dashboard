import { Prisma, TechnicalGrowth } from "@prisma/client"
import { TypeTechnicalGrowthForm } from "../schema/technicalGrwoth.schema"
import { TypeError } from "./utils.type"

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
  currentTechnicalGrowthList: TechnicalGrowth[]
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
  technicalGrowth: {
    itemDragged: TechnicalGrowth
    draggedTo: number
  }
  technicalGrowthLists: {
    remainingItemsList: TechnicalGrowth[]
    currentList: TechnicalGrowth[]
  }
  setStateActions: {
    technicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
    isListUpdated: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export type TypeSetUpdateTechnicalListOrderParams = {
  technicalGrowthListState: TechnicalGrowth[]
  dargAndDropRef: React.MutableRefObject<TypeDragAndDropTechnicalGrowth>
  setStateActions: {
    isListUpdated: React.Dispatch<React.SetStateAction<boolean>>
    technicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
  }
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

export type TypeResetTechnicalGrowthListButtonProps = {
  currentTechnicalGrowthList: TechnicalGrowth[]
  setStateActions: {
    technicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
    isListUpdated: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export type TypeUpdateTechnicalGrowthListButtonProps = {
  reValidPath: string
  technicalGrowthLists: {
    newList: TechnicalGrowth[]
    currentList: TechnicalGrowth[]
  }
  setStateActions: {
    technicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
    isListUpdated: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export type TypeTechnicalGrowthItemProps = {
  technicalGrowth: {
    positionNumber: number
    info: TechnicalGrowth
  }
  setStateActions: {
    isListUpdated: React.Dispatch<React.SetStateAction<boolean>>
    technicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
  }
  technicalGrowthListState: TechnicalGrowth[]
  dargAndDropRef: React.MutableRefObject<TypeDragAndDropTechnicalGrowth>
}
