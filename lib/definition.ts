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
} & ({ status: false; errors?: TypeErrors } | { status: true; data?: unknown })

export const SchemaSignIn = z.object({
  email: z.string().email("ایمیل معتبر نمیباشد").trim().min(1, "ایمیل اجباری میباشد"),
  password: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است"),
})
export type TypeSignInForm = z.infer<typeof SchemaSignIn>

export type TypeSessionPayload = {
  id: string
  expiresAt: Date
}

export const SchemaAdminProfile = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().trim().min(1, "نام اجباری میباشد"),
  phone: z.string().trim().min(1, "تلفن اجباری میباشد"),
  email: z.string().email("ایمیل معتبر نمیباشد").trim().min(1, "ایمیل اجباری میباشد"),
  location: z.string().trim().min(1, "موقعیت جغرافیایی اجباری میباشد"),
  bio: z.string().trim().min(1, "بیو اجباری میباشد"),
})
export type TypeAdminProfileFrom = z.infer<typeof SchemaAdminProfile>

export const SchemaAdminPassword = z.object({
  currentPassword: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است"),
  newPassword: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است"),
})
export type TypeAdminPasswordForm = z.infer<typeof SchemaAdminPassword>

export const SchemaProject = z.object({
  image: z.instanceof(File).optional(),
  title: z.string().trim().min(1, "title is required"),
  link: z.string().trim().min(1, "link is required"),
  source: z.string().trim().min(1, "source is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeProjectForm = z.infer<typeof SchemaProject>
export type TypeProjectFormWithoutImage = Omit<TypeProjectForm, "image">

export const SchemaSkill = z.object({
  name: z.string().trim().min(1, "name is required"),
  image: z.instanceof(File).optional(),
  link: z.string().trim().min(1, "link is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeSkillForm = z.infer<typeof SchemaSkill>
export type TypeSkillFormWithoutImage = Omit<TypeSkillForm, "image">

export const SchemaTechnicalGrowth = z.object({
  title: z.string().trim().min(1, "title is required"),
  subtitle: z.string().trim().min(1, "subtitle is required"),
  description: z.string().trim().min(1, "description is required"),
})
export type TypeTechnicalGrowthForm = z.infer<typeof SchemaTechnicalGrowth>
