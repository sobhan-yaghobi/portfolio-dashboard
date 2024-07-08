"use server"

import {
  SchemaSignIn,
  TypeErrors,
  TypeReturnSererAction,
  TypeSignInForm,
} from "@/actions/definition"

import prisma from "@/lib/prisma"
import { comparePassword } from "@/auth/auth"
import { createSession, deleteSession } from "@/auth/session"

export const signIn = async (formData: FormData): Promise<TypeReturnSererAction | undefined> => {
  const validationResult = SchemaSignIn.safeParse({
    pass1: formData.get("pass1"),
    pass2: formData.get("pass2"),
    pass3: formData.get("pass3"),
    pass4: formData.get("pass4"),
  } as TypeSignInForm)

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
  }

  const admin = await prisma.admin.findFirst()

  if (!admin) {
    return { message: "admin not found", status: false }
  }

  const { pass1, pass2, pass3, pass4 } = validationResult.data
  const compareResult1 = await comparePassword(admin.pass1, pass1)
  const compareResult2 = await comparePassword(admin.pass2, pass2)
  const compareResult3 = await comparePassword(admin.pass3, pass3)
  const compareResult4 = await comparePassword(admin.pass4, pass4)

  if (compareResult1 && compareResult2 && compareResult3 && compareResult4) {
    await createSession(admin.id)
    return { message: "success sign in", status: true }
  }
  return { status: false, message: "sign in failure" }
}

export const logout = () => deleteSession()
