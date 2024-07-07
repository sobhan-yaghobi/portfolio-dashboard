import { z } from "zod"

export const SchemaSignIn = z.object({
  pass1: z.string().trim().min(4, "pass1 erro"),
  pass2: z.string().trim().min(4, "pass1 erro"),
  pass3: z.string().trim().min(4, "pass1 erro"),
  pass4: z.string().trim().min(4, "pass1 erro"),
})
export type TypeSignInForm = z.infer<typeof SchemaSignIn>
export type TypeSignInState =
  | {
      errors?: {
        pass1?: string[]
        pass2?: string[]
        pass3?: string[]
        pass4?: string[]
      }
      message?: string
    }
  | undefined
  | null

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
export type TypeAddProjectState =
  | {
      errors?: {
        image?: string[]
        title?: string[]
        link?: string[]
        source?: string[]
        description?: string[]
      }
      message?: string
    }
  | undefined
  | null
