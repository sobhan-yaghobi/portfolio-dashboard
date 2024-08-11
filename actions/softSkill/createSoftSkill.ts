import { createSoftSkill, validateSoftSkillForm } from "./softSkillUtils"

import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import { TypeCreateSoftSkillFormAction } from "@/lib/types/softSkill.type"

export const createSoftSkillFormAction = async ({
  softSkill,
  reValidPath,
}: TypeCreateSoftSkillFormAction): Promise<TypeReturnSererAction> => {
  const validateResult = validateSoftSkillForm(softSkill.formData)

  if (validateResult.success)
    return await createSoftSkill({
      softSkill: {
        infoForm: validateResult.data,
      },
      reValidPath,
    })

  return { errors: validateResult.error.flatten().fieldErrors as TypeErrors, status: false }
}
