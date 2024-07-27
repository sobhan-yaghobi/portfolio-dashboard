"use server"

import { SchemaSignIn, TypeErrors, TypeReturnSererAction, TypeSignInForm } from "@/lib/definition"

import prisma from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/auth/auth"
import { createSession, deleteSession } from "@/auth/session"

export const SignInFormAction = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validateResult = validateSignInForm(formData)

  if (validateResult.success) return Sign(validateResult.data)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validateSignInForm = (formData: FormData) =>
  SchemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  } as TypeSignInForm)

const Sign = async (AdminInfoForm: TypeSignInForm): Promise<TypeReturnSererAction> => {
  const isAdminEmpty = !Boolean(await prisma.admin.count())

  if (isAdminEmpty) {
    return createAdmin(AdminInfoForm)
  }
  return checkAdminForLogin(AdminInfoForm)
}

const createAdmin = async (AdminInfoForm: TypeSignInForm): Promise<TypeReturnSererAction> => {
  const hashedPassword = await hashPassword(AdminInfoForm.password)
  const adminCreationResult = await prisma.admin.create({
    data: { ...AdminInfoForm, password: hashedPassword },
  })

  if (adminCreationResult) {
    await createSession(adminCreationResult.id)
    return { message: "admin create successfully", status: true }
  }
  return { message: "admin create failure", status: false }
}

const checkAdminForLogin = async (
  AdminInfoForm: TypeSignInForm
): Promise<TypeReturnSererAction> => {
  const { email, password } = AdminInfoForm
  const adminInfoResult = await prisma.admin.findUnique({ where: { email } })

  if (adminInfoResult) {
    const comparePasswordResult = await comparePassword(adminInfoResult.password, password)

    if (comparePasswordResult) {
      await createSession(adminInfoResult.id)
      return { message: "admin login successfully", status: true }
    }
  }
  return { message: "sorry you are not admin", status: false }
}

export const logout = () => deleteSession()
