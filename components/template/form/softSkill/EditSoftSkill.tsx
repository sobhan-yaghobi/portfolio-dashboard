"use client"

import React, { useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { editSoftSkillFormAction } from "@/actions/softSkill/editSoftSkill"

import { TypeError } from "@/lib/types/utils.type"
import { TypeEditSoftSkillListComponentProps } from "@/lib/types/softSkill.type"

import SoftSkillForm from "./SoftSkillForm"

const EditSoftSkill: React.FC<TypeEditSoftSkillListComponentProps> = ({ id, defaultValues }) => {
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editSoftSkillFormAction({
      softSkill: { id, formData: event },
      reValidPath: "/dashboard/softskilllist",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    setErrors({} as TypeError)
  }

  return (
    <SoftSkillForm
      defaultValues={defaultValues}
      errors={errors}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditSoftSkill
