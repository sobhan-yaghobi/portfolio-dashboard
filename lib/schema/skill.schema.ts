import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaSkill = z.object({
  name: z.string().trim().min(1, "name is required").transform(trimAndNormalize),
  image: z.instanceof(File).optional(),
  link: z.string().trim().min(1, "link is required").transform(trimAndNormalize),
  description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
})

export type TypeSkillForm = z.infer<typeof SchemaSkill>

export type TypeSkillFormWithoutImage = Omit<TypeSkillForm, "image">
