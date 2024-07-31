import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"

import { TypeShowActionReturnMessageParam } from "./types"
import { verifyToken } from "@/auth/auth"

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

// export const getAdminToken = async () => {
//   // const cookie = cookies().get("session")?.value
//   // const sessionResult = await decrypt(cookie)
//   // return typeof sessionResult?.id === "string" ? sessionResult.id : undefined
//   return ""
// }

export const getAdminId = async (token: string | undefined) =>
  token ? await verifyToken(token) : undefined
