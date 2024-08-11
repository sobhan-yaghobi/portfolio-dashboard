import { z } from "zod"
import { trimAndNormalize } from "./utils"
import { experienceYearTime } from "@prisma/client"

export const SchemaTechnicalSkill = z.object({
  name: z.string().trim().min(1, "نام اجباری میباشد").transform(trimAndNormalize),
  image: z.instanceof(File).optional(),
  link: z.string().trim().min(1, "لینک داکیومنت اجباری میباشد").transform(trimAndNormalize),
  description: z.string().trim().min(1, "متن توضیح اجباری میباشد").transform(trimAndNormalize),
  experienceYearTime: z.enum(
    [
      experienceYearTime.LESS_ONE_YEAR,
      experienceYearTime.BETWEEN_ONE_AND_TWO_YEAR,
      experienceYearTime.BETWEEN_TWO_AND_FOUR_YEAR,
      experienceYearTime.BETWEEN_FOUR_AND_TEN_YEAR,
      experienceYearTime.MORE_TEN_YEAR,
    ],
    {
      message: "سطح تجربه اجباری میباشد",
    }
  ),
})

export type TypeTechnicalSkillForm = z.infer<typeof SchemaTechnicalSkill>

export type TypeTechnicalSkillFormWithoutImage = Omit<TypeTechnicalSkillForm, "image">
