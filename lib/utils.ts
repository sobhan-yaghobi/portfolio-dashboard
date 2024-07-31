import prisma from "./prisma"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify"
import { cookies } from "next/headers"
import { decrypt } from "@/auth/session"

import { TypeShowActionReturnMessageParam } from "./types"

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

export const getAdminToken = async () => {
  const cookie = cookies().get("session")?.value
  const sessionResult = await decrypt(cookie)
  return typeof sessionResult?.id === "string" ? sessionResult.id : undefined
}

export const getAdminId = async () => {
  const adminId = await getAdminToken()
  const adminResult = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true },
  })
  return adminResult?.id
}
