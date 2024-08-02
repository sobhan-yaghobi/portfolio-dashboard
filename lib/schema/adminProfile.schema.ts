import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaAdminProfile = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().trim().min(1, "نام اجباری میباشد").transform(trimAndNormalize),
  family: z.string().trim().min(1, "نام خانوادگی اجباری میباشد").transform(trimAndNormalize),
  phone: z.string().trim().min(1, "تلفن اجباری میباشد").transform(trimAndNormalize),
  email: z
    .string()
    .email("ایمیل معتبر نمیباشد")
    .trim()
    .min(1, "ایمیل اجباری میباشد")
    .transform(trimAndNormalize),
  location: z.string().trim().min(1, "موقعیت جغرافیایی اجباری میباشد").transform(trimAndNormalize),
  bio: z.string().trim().min(1, "بیو اجباری میباشد").transform(trimAndNormalize),
})

export type TypeAdminProfileFrom = z.infer<typeof SchemaAdminProfile>

export type TypeAdminProfileFromWithoutImage = Omit<TypeAdminProfileFrom, "image">
