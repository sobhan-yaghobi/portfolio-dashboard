"use server"

import { comparePassword, hashPassword } from "@/auth/auth"
import {
  SchemaAdminPassword,
  TypeAdminPasswordForm,
  TypeErrors,
  TypeReturnSererAction,
} from "@/lib/definition"
import prisma from "@/lib/prisma"
import { PasswordAdminInput } from "@/lib/types"

export const changePasswordFormAction = async (
  adminId: string,
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const validateResult = validatePasswordFrom(formData)

  if (validateResult.success) return checkPassword(adminId, validateResult.data)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validatePasswordFrom = (formData: FormData) =>
  SchemaAdminPassword.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  } as TypeAdminPasswordForm)

const checkPassword = async (
  adminId: string,
  passwordFormInfo: TypeAdminPasswordForm
): Promise<TypeReturnSererAction> => {
  const adminInfo = await getAdmin(adminId)
  if (adminInfo) {
    const comparePasswordResult = await comparePassword(
      adminInfo.password,
      passwordFormInfo.currentPassword
    )

    if (comparePasswordResult) {
      return changePassword(adminId, passwordFormInfo.newPassword)
    }
    return { status: false, message: "Current password is incorrect" }
  }
  return { status: false, message: "Admin not found" }
}

const getAdmin = async (adminId: string) =>
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

  if (changePasswordResult) {
    return { message: "password change successfully", status: true }
  }
  return { message: "password change failure", status: false }
}
