"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/definition"
import { AddTechnicalGrowthComponentProps } from "@/lib/types"

import { addTechnicalGrowthFormAction } from "@/actions/technicalGrowth/createTechnicalGrowth"

import Form from "./TechnicalGrowthForm"

const AddTechnicalGrowth: React.FC<AddTechnicalGrowthComponentProps> = ({ path }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addTechnicalGrowthFormAction(event, path)

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    ref.current?.reset()
    setErrors({} as TypeError)
  }

  return <Form errors={errors} ref={ref} submitFunction={clientAction} submitText="اضافه کن" />
}

export default AddTechnicalGrowth
