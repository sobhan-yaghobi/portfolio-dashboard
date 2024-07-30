import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

import { TypeReturnSererAction } from "./definition"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImagePath = (imageUrl: string) => imageUrl.split("/").pop()

export const showActionReturnMessage = (actionResult: TypeReturnSererAction) => {
  const { message } = actionResult
  if (actionResult.status) {
    message && toast.success(message)
  } else {
    message && toast.error(message)
  }
}

export const updateUrl = (url: string) => {
  const mainUrl = url.split("?").at(0)
  return mainUrl?.concat(`?updatedAt=${Date.now()}`)
}
