"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { createSoftSkillFormAction } from "@/actions/softSkill/createSoftSkill"

import { TypeError } from "@/lib/types/utils.type"

import SoftSkillForm from "./SoftSkillForm"

const CreateSoftSkill: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createSoftSkillFormAction({
      softSkill: { formData: event },
      reValidPath: "/dashboard/softskilllist",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
  }

  return (
    <SoftSkillForm
      errors={errors}
      submitFunction={clientAction}
      submitText="اضافه کن"
      ref={formRef}
    />
  )
}

export default CreateSoftSkill
