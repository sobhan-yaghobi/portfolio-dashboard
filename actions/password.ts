"use server"

import prisma from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/auth/auth"
import { cookies } from "next/headers"
import { decrypt } from "@/auth/session"

import {
  SchemaAdminPassword,
  TypeAdminPasswordForm,
  TypeErrors,
  TypeReturnSererAction,
} from "@/lib/definition"
import { PasswordAdminInput, TypePasswordAdminInput } from "@/lib/types"

export const changePasswordFormAction = async (
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const validateResult = validatePasswordFrom(formData)

  if (validateResult.success) return checkPassword(validateResult.data)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validatePasswordFrom = (formData: FormData) =>
  SchemaAdminPassword.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  } as TypeAdminPasswordForm)

const checkPassword = async (
  passwordFormInfo: TypeAdminPasswordForm
): Promise<TypeReturnSererAction> => {
  const { currentPassword, newPassword } = passwordFormInfo
  if (currentPassword === newPassword)
    return { message: "two password is equal, change it", status: false }

  const adminTokenResult = await getAdminToken()
  const adminInfo = await fetchAdminIdAndPassword(
    typeof adminTokenResult?.id === "string" ? adminTokenResult?.id : undefined
  )

  if (!adminInfo) return { status: false, message: "Admin not found" }

  const comparePasswordResult = await comparePassword(adminInfo.password, currentPassword)

  if (!comparePasswordResult) return { status: false, message: "Current password is incorrect" }

  return changePassword(adminInfo.id, newPassword)
}

const getAdminToken = async () => {
  const cookie = cookies().get("session")?.value
  const sessionResult = await decrypt(cookie)
  return sessionResult
}

const fetchAdminIdAndPassword = async (
  adminId: string | undefined
): Promise<TypePasswordAdminInput | null> =>
  await prisma.admin.findUnique({
    where: { id: adminId },
    select: PasswordAdminInput,
  })

const changePassword = async (adminId: string, newPassword: string) => {
  const newHashedPassword = await hashPassword(newPassword)
  const changePasswordResult = await prisma.admin.update({
    where: { id: adminId },
    data: { password: newHashedPassword },
  })

  if (changePasswordResult) return { message: "password change successfully", status: true }

  return { message: "password change failure", status: false }
}
