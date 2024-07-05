import { compare, hash } from "bcrypt"

export const hashPassword = async (password: string) => hash(password, 12)
export const comparePassword = async (hashedPassword: string, password: string) =>
  compare(password, hashedPassword)
