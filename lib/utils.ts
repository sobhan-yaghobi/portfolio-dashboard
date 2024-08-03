import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

import { TypeShowActionReturnMessageParam } from "./types/utils.type"
import { verifyToken } from "@/auth/clientFunctions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImagePath = (imageUrl: string) => imageUrl.split("/").pop()

export const showActionReturnMessage = ({
  actionResult,
  functions,
}: TypeShowActionReturnMessageParam) => {
  const { message } = actionResult
  if (actionResult.status) {
    message && toast.success(message)
    functions?.doActionIfTrue && functions?.doActionIfTrue()
  } else {
    message && toast.error(message)
    functions?.doActionIfFalse && functions?.doActionIfFalse()
  }
}

export const updateUrl = (url: string) => {
  const mainUrl = url.split("?").at(0)
  return mainUrl?.concat(`?updatedAt=${Date.now()}`)
}

export const getAdminId = async (token: string | undefined) =>
  token ? await verifyToken(token) : undefined

export const formatPhoneNumber = (phoneNumber: string) => {
  let filteredPhoneNumber
  filteredPhoneNumber = phoneNumber.replace(/\D/g, "")

  if (filteredPhoneNumber.length > 10) return false

  if (filteredPhoneNumber.length > 3 && filteredPhoneNumber.length <= 6) {
    filteredPhoneNumber = filteredPhoneNumber.replace(/(\d{3})(\d+)/, "$1 $2")
  } else if (filteredPhoneNumber.length > 6) {
    filteredPhoneNumber = filteredPhoneNumber.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3")
  }
  return filteredPhoneNumber
}
