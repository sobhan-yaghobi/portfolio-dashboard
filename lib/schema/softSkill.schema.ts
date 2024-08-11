import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaSoftSkill = z.object({
  name: z.string().trim().min(1, "عنوان اجباری میباشد").transform(trimAndNormalize),
  score: z.number().min(1, "حداقل نمره 1 میباشد").max(5, "حداکثر نمره 5 میباشد"),
})

export type TypeSoftSkillForm = z.infer<typeof SchemaSoftSkill>
