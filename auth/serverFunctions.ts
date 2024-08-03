import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { TypeEncryptParams } from "@/lib/schema/signIn.schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.SECRET)

export const setToken = async (id: string) => {
  const { token, expiresAt } = await createToken(id)

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export const createToken = async (id: string) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 60 * 500)
  const token = await encrypt({ id, expiresAt })
  return { expiresAt, token }
}

export const encrypt = async (payload: TypeEncryptParams) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key)

export const decrypt = async (token: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    })
    return { id: payload.id, ...payload }
  } catch (_) {
    return null
  }
}

export const getToken = () => cookies().get("token")

export const deleteToken = () => {
  cookies().delete("token")
  redirect("/login")
}
