"use server"

import prisma from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/auth/clientFunctions"
import { getToken } from "@/auth/serverFunctions"
import { getAdminId } from "@/lib/utils"

import { SchemaAdminPassword, TypeAdminPasswordForm } from "@/lib/schema/adminPassword.schema"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import { PasswordAdminInput, TypePasswordAdminInput } from "@/lib/types/profile.type"

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
    return { message: "مقادیر نمیتوانند باهم برابر باشند", status: false }

  const token = getToken()?.value
  const adminId = await getAdminId(token)
  const adminInfo = await fetchAdminIdAndPassword(adminId)

  if (!adminInfo) return { status: false, message: "ادمین یافت نشد" }

  const comparePasswordResult = await comparePassword(adminInfo.password, currentPassword)

  if (!comparePasswordResult) return { status: false, message: "گذرواژه درست نیست" }

  return changePassword(adminInfo.id, newPassword)
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

  if (changePasswordResult) return { message: "گذرواژه با موفقیت تغییر یافت", status: true }

  return { message: "تغییر گذرواژه با مشکل مواجه شد", status: false }
}
