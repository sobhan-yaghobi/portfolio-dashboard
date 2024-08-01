import { z } from "zod"

const trimAndNormalize = (str: string) => str.trim().replace(/\s+/g, " ")

// export const SchemaSignIn = z.object({
//   email: z
//     .string()
//     .email("ایمیل معتبر نمیباشد")
//     .trim()
//     .min(1, "ایمیل اجباری میباشد")
//     .transform(trimAndNormalize),
//   password: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است").transform(trimAndNormalize),
// })
// export type TypeSignInForm = z.infer<typeof SchemaSignIn>

// export type TypeSessionPayload = {
//   id: string
//   expiresAt: Date
// }

// export const SchemaAdminProfile = z.object({
//   image: z.instanceof(File).optional(),
//   name: z.string().trim().min(1, "نام اجباری میباشد").transform(trimAndNormalize),
//   phone: z.string().trim().min(1, "تلفن اجباری میباشد").transform(trimAndNormalize),
//   email: z
//     .string()
//     .email("ایمیل معتبر نمیباشد")
//     .trim()
//     .min(1, "ایمیل اجباری میباشد")
//     .transform(trimAndNormalize),
//   location: z.string().trim().min(1, "موقعیت جغرافیایی اجباری میباشد").transform(trimAndNormalize),
//   bio: z.string().trim().min(1, "بیو اجباری میباشد").transform(trimAndNormalize),
// })
// export type TypeAdminProfileFrom = z.infer<typeof SchemaAdminProfile>
// export type TypeAdminProfileFromWithoutImage = Omit<TypeAdminProfileFrom, "image">

// export const SchemaAdminPassword = z.object({
//   currentPassword: z
//     .string()
//     .trim()
//     .min(4, "حداقل 8 کارکتر مورد نیاز است")
//     .transform(trimAndNormalize),
//   newPassword: z.string().trim().min(4, "حداقل 8 کارکتر مورد نیاز است").transform(trimAndNormalize),
// })
// export type TypeAdminPasswordForm = z.infer<typeof SchemaAdminPassword>

// export const SchemaProject = z.object({
//   image: z.instanceof(File).optional(),
//   title: z.string().trim().min(1, "title is required").transform(trimAndNormalize),
//   link: z.string().trim().min(1, "link is required").transform(trimAndNormalize),
//   source: z.string().trim().min(1, "source is required").transform(trimAndNormalize),
//   description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
// })
// export type TypeProjectForm = z.infer<typeof SchemaProject>
// export type TypeProjectFormWithoutImage = Omit<TypeProjectForm, "image">

// export const SchemaSkill = z.object({
//   name: z.string().trim().min(1, "name is required").transform(trimAndNormalize),
//   image: z.instanceof(File).optional(),
//   link: z.string().trim().min(1, "link is required").transform(trimAndNormalize),
//   description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
// })
// export type TypeSkillForm = z.infer<typeof SchemaSkill>
// export type TypeSkillFormWithoutImage = Omit<TypeSkillForm, "image">

export const SchemaTechnicalGrowth = z.object({
  title: z.string().trim().min(1, "title is required").transform(trimAndNormalize),
  subtitle: z.string().trim().min(1, "subtitle is required").transform(trimAndNormalize),
  description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
})
export type TypeTechnicalGrowthForm = z.infer<typeof SchemaTechnicalGrowth>
