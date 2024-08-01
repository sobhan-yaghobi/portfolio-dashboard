"use server"

import prisma from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/auth/auth"
import { createSession, deleteSession } from "@/auth/session"

import { SchemaSignIn, TypeSignInForm } from "@/lib/definition"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"

export const signInFormAction = async (formData: FormData): Promise<TypeReturnSererAction> => {
  const validateResult = validateSignInForm(formData)

  if (validateResult.success) return handleSignIn(validateResult.data)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validateSignInForm = (formData: FormData) =>
  SchemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  } as TypeSignInForm)

const handleSignIn = async (AdminInfoForm: TypeSignInForm): Promise<TypeReturnSererAction> => {
  const isAdminEmpty = !Boolean(await prisma.admin.count())

  if (isAdminEmpty) return createAdmin(AdminInfoForm)

  return checkAdminForLogin(AdminInfoForm)
}

const createAdmin = async (AdminInfoForm: TypeSignInForm): Promise<TypeReturnSererAction> => {
  const hashedPassword = await hashPassword(AdminInfoForm.password)
  const adminCreationResult = await prisma.admin.create({
    data: { ...AdminInfoForm, password: hashedPassword },
  })

  if (adminCreationResult) {
    await createSession(adminCreationResult.id)
    return { message: "Admin created successfully", status: true }
  }
  return { message: "Admin creation failed", status: false }
}

const checkAdminForLogin = async (
  adminInfoForm: TypeSignInForm
): Promise<TypeReturnSererAction> => {
  const { email, password } = adminInfoForm
  const adminInfoResult = await prisma.admin.findUnique({ where: { email } })
  if (!adminInfoResult) return { message: "Admin not found", status: false }

  const comparePasswordResult = await comparePassword(adminInfoResult.password, password)
  if (!comparePasswordResult) return { message: "Wrong Info", status: false }

  await createSession(adminInfoResult.id)
  return { message: "Admin login successfully", status: true }
}

export const logout = () => deleteSession()
