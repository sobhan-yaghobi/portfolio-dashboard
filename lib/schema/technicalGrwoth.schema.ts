import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaTechnicalGrowth = z.object({
  title: z.string().trim().min(1, "title is required").transform(trimAndNormalize),
  subtitle: z.string().trim().min(1, "subtitle is required").transform(trimAndNormalize),
  description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
})

export type TypeTechnicalGrowthForm = z.infer<typeof SchemaTechnicalGrowth>
