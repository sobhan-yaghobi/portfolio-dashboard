import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaTechnicalGrowth = z.object({
  title: z.string().trim().min(1, "عنوان اجباری میباشد").transform(trimAndNormalize),
  subtitle: z.string().trim().min(1, "زیر عنوان اجباری میباشد").transform(trimAndNormalize),
  description: z.string().trim().min(1, "متن توضیح اجباری میباشد").transform(trimAndNormalize),
})

export type TypeTechnicalGrowthForm = z.infer<typeof SchemaTechnicalGrowth>
