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
  email: z.string().email("ایمیل معتبر نمیباشد").trim().min(1, "ایمیل اجباری میباشد"),
  password: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است"),
})
export type TypeSignInForm = z.infer<typeof SchemaSignIn>

export type TypeSessionPayload = {
  id: string
  expiresAt: Date
}

export const SchemaProfile = z.object({
  password: z.string().trim().min(8, "حداقل طول پسورد 8 کارکتر میباشد"),
  image: z.instanceof(File).superRefine((file, ctx) => {
    if (!file.size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "عکس اجباری میباشد",
        path: ["image"],
      })
    }
  }),
  name: z.string().trim().min(1, "نام اجباری میباشد"),
  phone: z.number().min(1, "تلفن اجباری میباشد"),
  email: z.string().email("ایمیل معتبر نمیباشد").trim().min(1, "ایمیل اجباری میباشد"),
  location: z.string().trim().min(1, "موقعیت جغرافیایی اجباری میباشد"),
  bio: z.string().trim().min(1, "بیو اجباری میباشد"),
})
export type TypeProfileFrom = z.infer<typeof SchemaProfile>

export const SchemaAddProject = z.object({
  image: z.instanceof(File).superRefine((file, ctx) => {
    if (!file.size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "عکس اجباری میباشد",
        path: ["image"],
      })
    }
  }),
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

export const SchemaTechnicalGrowth = z.object({
  title: z.string().trim().min(1, "title is required"),
  subtitle: z.string().trim().min(1, "subtitle is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeTechnicalGrowth = z.infer<typeof SchemaTechnicalGrowth>
