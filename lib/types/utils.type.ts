export type TypeError = {
  [key: string]: string[]
}
export type TypeErrors = {
  errors: { [key: string]: string }
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

export type TypeReturnSererAction = {
  message?: string
} & ({ status: false; errors?: TypeErrors } | { status: true; data?: unknown })
