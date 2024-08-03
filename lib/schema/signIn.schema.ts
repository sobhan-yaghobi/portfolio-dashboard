import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaSignIn = z.object({
  email: z
    .string()
    .email("ایمیل معتبر نمیباشد")
    .trim()
    .min(1, "ایمیل اجباری میباشد")
    .transform(trimAndNormalize),
  password: z.string().trim().min(8, "حداقل 8 کارکتر مورد نیاز است").transform(trimAndNormalize),
})
export type TypeSignInForm = z.infer<typeof SchemaSignIn>

export type TypeEncryptParams = {
  id: string
  expiresAt: Date
}
