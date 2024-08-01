import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaSkill = z.object({
  name: z.string().trim().min(1, "نام اجباری میباشد").transform(trimAndNormalize),
  image: z.instanceof(File).optional(),
  link: z.string().trim().min(1, "لینک داکیومنت اجباری میباشد").transform(trimAndNormalize),
  description: z.string().trim().min(1, "متن توضیح اجباری میباشد").transform(trimAndNormalize),
})

export type TypeSkillForm = z.infer<typeof SchemaSkill>

export type TypeSkillFormWithoutImage = Omit<TypeSkillForm, "image">
