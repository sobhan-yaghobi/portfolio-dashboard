import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { TypeSessionPayload } from "../actions/definition"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const key = new TextEncoder().encode(process.env.SECRET)

export const encrypt = async (payload: TypeSessionPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2day")
    .sign(key)
export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    })
    return { id: payload.id, ...payload }
  } catch (_) {
    return null
  }
}

export const createSession = async (id: string) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  const session = await encrypt({ id, expiresAt })
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
  redirect("/dashboard")
}

export const deleteSession = () => {
  cookies().delete("session")
  redirect("/login")
}
