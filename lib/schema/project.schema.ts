import { z } from "zod"
import { trimAndNormalize } from "./utils"

export const SchemaProject = z.object({
  image: z.instanceof(File).optional(),
  title: z.string().trim().min(1, "عنوان اجباری میباشد").transform(trimAndNormalize),
  link: z.string().trim().transform(trimAndNormalize),
  source: z.string().trim().min(1, "لینک سورس اجباری میباشد").transform(trimAndNormalize),
  description: z.string().trim().min(1, "متن توضیح اجباری میباشد").transform(trimAndNormalize),
})

export type TypeProjectForm = z.infer<typeof SchemaProject>

export type TypeProjectFormWithoutImage = Omit<TypeProjectForm, "image">
