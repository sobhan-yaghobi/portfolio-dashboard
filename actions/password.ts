"use server"

import { comparePassword, hashPassword } from "@/auth/auth"
import { SchemaAdminPassword, TypeAdminPasswordForm, TypeErrors } from "@/lib/definition"
import prisma from "@/lib/prisma"
import { PasswordAdminInput } from "@/lib/types"

const getPasswords = (formData: FormData) =>
  ({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  } as TypeAdminPasswordForm)

export const changePassword = async (id: string, formData: FormData) => {
  const validationResult = SchemaAdminPassword.safeParse(getPasswords(formData))

  if (validationResult.success) {
    const adminPassword = await prisma.admin.findUnique({
      where: { id },
      select: PasswordAdminInput,
    })

    if (adminPassword) {
      const comparePasswordResult = await comparePassword(
        adminPassword.password,
        validationResult.data.currentPassword
      )

      if (comparePasswordResult) {
        const newHashedPassword = await hashPassword(validationResult.data.newPassword)
        const changePasswordResult = await prisma.admin.update({
          where: { id },
          data: { password: newHashedPassword },
        })

        if (changePasswordResult) {
          return { message: "password change successfully", status: true }
        }
        return { message: "password change failure", status: false }
      }

      return { message: "password in not correct", status: false }
    }
    return { message: "admin not found", status: false }
  }

  return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
}
