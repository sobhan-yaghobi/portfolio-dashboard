"use server"

import { SchemaSignIn, TypeErrors, TypeReturnSererAction, TypeSignInForm } from "@/lib/definition"

import prisma from "@/lib/prisma"
import { comparePassword } from "@/auth/auth"
import { createSession, deleteSession } from "@/auth/session"

export const signIn = async (formData: FormData): Promise<TypeReturnSererAction | undefined> => {
  const validationResult = SchemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  } as TypeSignInForm)

  if (validationResult.success) {
    const { email, password } = validationResult.data
    const admin = await prisma.admin.findFirst({ where: { email } })

    if (admin) {
      const comparePasswordResult = await comparePassword(admin.password, password)

      if (comparePasswordResult) {
        await createSession(admin.id)
        return { message: "success sign in", status: true }
      }
    }
    return { message: "admin not found", status: false }
  } else {
    console.log("validationResult.error", validationResult.error)

    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }
}

export const logout = () => deleteSession()
