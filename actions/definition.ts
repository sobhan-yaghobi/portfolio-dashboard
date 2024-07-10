import { Project } from "@prisma/client"
import { z } from "zod"

export type TypeError = {
  [key: string]: string[]
}
export type TypeErrors = {
  errors: { [key: string]: string }
}

export type TypeReturnSererAction = {
  message?: string
  status: boolean
  errors?: TypeErrors
}

export const SchemaSignIn = z.object({
  pass1: z.string().trim().min(4, "pass1 error"),
  pass2: z.string().trim().min(4, "pass2 error"),
  pass3: z.string().trim().min(4, "pass3 error"),
  pass4: z.string().trim().min(4, "pass4 error"),
})
export type TypeSignInForm = z.infer<typeof SchemaSignIn>

export type TypeSessionPayload = {
  id: string
  expiresAt: Date
}

export const SchemaAddProject = z.object({
  image: z.string().trim().min(1, "image is required"),
  title: z.string().trim().min(1, "title is required"),
  link: z.string().trim().min(1, "link is required"),
  source: z.string().trim().min(1, "source is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeAddProject = z.infer<typeof SchemaAddProject>

export const SchemaAddSkill = z.object({
  name: z.string().trim().min(1, "name is required"),
  image: z.string().trim().min(1, "image is required"),
  link: z.string().trim().min(1, "link is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeAddSkill = z.infer<typeof SchemaAddSkill>
