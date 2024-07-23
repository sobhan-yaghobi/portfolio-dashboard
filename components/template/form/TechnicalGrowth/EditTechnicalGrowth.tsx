"use client"

import React, { useRef, useState } from "react"
import { TypeError } from "@/actions/definition"
import { TypeTechnicalGrowth } from "@/lib/types"

import Form from "./TechnicalGrowthForm"
import { editTechnicalGrowth } from "@/actions/TechnicalGrowth"
import { toast } from "react-toastify"

type EditTechnicalGrowthProps = {
  id: string
  defaultValues: TypeTechnicalGrowth | null
}

const EditTechnicalGrowth: React.FC<EditTechnicalGrowthProps> = ({ id, defaultValues }) => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    if (id) {
      const actionResult = await editTechnicalGrowth(id, event, "/tec_growth")
      if (actionResult) {
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
  }
  return (
    <Form
      ref={ref}
      errors={errors}
      submitFunction={clientAction}
      submitText="Edit"
      defaultValues={defaultValues}
    />
  )
}

export default EditTechnicalGrowth
