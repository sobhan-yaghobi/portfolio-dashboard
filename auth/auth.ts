import { compare, hash } from "bcryptjs"
import { env } from "process"

export const hashPassword = async (password: string) => hash(password, 12)
export const comparePassword = async (hashedPassword: string, password: string) =>
  compare(password, hashedPassword)

export const verifyToken = async (token: string) => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await res.json()

    return result
  } catch (error) {
    return false
  }
}
