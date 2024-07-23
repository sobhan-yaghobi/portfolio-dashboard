import { compare, hash } from "bcryptjs"
import { env } from "process"

export const hashPassword = async (password: string) => hash(password, 12)
export const comparePassword = async (hashedPassword: string, password: string) =>
  compare(password, hashedPassword)

export const verifyToken = async (id: string) => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const result = await res.json()

    return result
  } catch (error) {
    return false
  }
}
