"use client"

import React, { useRef, useState } from "react"

import { addTechnicalGrowthFormAction } from "@/actions/technicalGrowth/createTechnicalGrowth"

import { TypeError } from "@/lib/definition"

import Form from "./TechnicalGrowthForm"
import { toast } from "react-toastify"

type AddTechnicalGrowthProps = {
  path: string
}

const AddTechnicalGrowth: React.FC<AddTechnicalGrowthProps> = ({ path }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addTechnicalGrowthFormAction(event, path)
    if (actionResult) {
      if (!actionResult.status) {
        ref.current?.reset()
      }
      if ("errors" in actionResult) {
        return setErrors({ ...actionResult.errors } as TypeError)
      }

      const message = actionResult.message
      if (actionResult.status) {
        setErrors({} as TypeError)
        message && toast.success(message)
      } else {
        message && toast.error(message)
      }
      ref.current?.reset()
    }
  }
  return <Form ref={ref} errors={errors} submitFunction={clientAction} submitText="Add" />
}

export default AddTechnicalGrowth
