import { z } from "zod"

export const SchemaSignIn = z.object({
  pass1: z.string().trim().min(4, "pass1 erro"),
  pass2: z.string().trim().min(4, "pass1 erro"),
  pass3: z.string().trim().min(4, "pass1 erro"),
  pass4: z.string().trim().min(4, "pass1 erro"),
})

export type TypeSignInForm = z.infer<typeof SchemaSignIn>

export type TypeFormState =
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
