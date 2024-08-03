"use server"

import prisma from "@/lib/prisma"
import { comparePassword, hashPassword } from "@/auth/clientFunctions"
import { redirect } from "next/navigation"

import { setToken, deleteToken } from "@/auth/serverFunctions"

import { SchemaSignIn, TypeSignInForm } from "@/lib/schema/signIn.schema"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"

export const signInFormAction = async (
  formData: FormData,
  redirectPath: string
): Promise<TypeReturnSererAction> => {
  const validateResult = validateSignInForm(formData)

  if (validateResult.success) return handleSignIn(validateResult.data, redirectPath)

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}

const validateSignInForm = (formData: FormData) =>
  SchemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  } as TypeSignInForm)

const handleSignIn = async (
  AdminInfoForm: TypeSignInForm,
  redirectPath: string
): Promise<TypeReturnSererAction> => {
  const isAdminEmpty = !Boolean(await prisma.admin.count())

  if (isAdminEmpty) return createAdmin(AdminInfoForm, redirectPath)

  return checkAdminForLogin(AdminInfoForm, redirectPath)
}

const createAdmin = async (
  AdminInfoForm: TypeSignInForm,
  redirectPath: string
): Promise<TypeReturnSererAction> => {
  const hashedPassword = await hashPassword(AdminInfoForm.password)
  const adminCreationResult = await prisma.admin.create({
    data: { ...AdminInfoForm, password: hashedPassword },
  })

  if (!adminCreationResult) return { message: "اضافه کردن ادمین با مشکل مواجه شد", status: false }

  await setToken(adminCreationResult.id)
  redirect(redirectPath)
}

const checkAdminForLogin = async (
  adminInfoForm: TypeSignInForm,
  redirectPath: string
): Promise<TypeReturnSererAction> => {
  const { email, password } = adminInfoForm
  const adminInfoResult = await prisma.admin.findUnique({ where: { email } })
  if (!adminInfoResult) return { message: "ادمین یافت نشد", status: false }

  const comparePasswordResult = await comparePassword(adminInfoResult.password, password)
  if (!comparePasswordResult) return { message: "اطلاعات وارد شده اشتباه هستند!", status: false }

  redirect(redirectPath)
}

export const logout = () => deleteToken()
