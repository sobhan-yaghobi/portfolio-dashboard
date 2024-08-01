import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaAdminPassword = z.object({
  currentPassword: z
    .string()
    .trim()
    .min(4, "حداقل 8 کارکتر مورد نیاز است")
    .transform(trimAndNormalize),
  newPassword: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است").transform(trimAndNormalize),
})

export type TypeAdminPasswordForm = z.infer<typeof SchemaAdminPassword>
