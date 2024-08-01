import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaProject = z.object({
  image: z.instanceof(File).optional(),
  title: z.string().trim().min(1, "title is required").transform(trimAndNormalize),
  link: z.string().trim().min(1, "link is required").transform(trimAndNormalize),
  source: z.string().trim().min(1, "source is required").transform(trimAndNormalize),
  description: z.string().trim().min(1, "description is required").transform(trimAndNormalize),
})

export type TypeProjectForm = z.infer<typeof SchemaProject>

export type TypeProjectFormWithoutImage = Omit<TypeProjectForm, "image">
