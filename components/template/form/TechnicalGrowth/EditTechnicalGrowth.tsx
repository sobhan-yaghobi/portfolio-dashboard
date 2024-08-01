"use client"

import React, { useRef, useState } from "react"

import { TypeError } from "@/lib/definition"
import { TypeEditTechnicalGrowthComponentProps } from "@/lib/types/technicalGrowth.type"

import { editTechnicalGrowthFormAction } from "@/actions/technicalGrowth/editInfoTechnicalGrowth"

import Form from "./TechnicalGrowthForm"
import { showActionReturnMessage } from "@/lib/utils"

const EditTechnicalGrowth: React.FC<TypeEditTechnicalGrowthComponentProps> = ({
  id,
  defaultValues,
}) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editTechnicalGrowthFormAction({
      technicalGrowth: { id, formData: event },
      reValidPath: "/dashboard/tec_growth",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    setErrors({} as TypeError)
    ref.current?.reset()
  }

  return (
    <Form
      defaultValues={defaultValues}
      errors={errors}
      ref={ref}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditTechnicalGrowth
