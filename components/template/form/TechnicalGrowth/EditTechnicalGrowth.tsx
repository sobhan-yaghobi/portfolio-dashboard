"use client"

import React, { useState } from "react"
import Form from "./Form"
import { TypeError } from "@/actions/definition"

type EditTechnicalGrowthProps = {
  id: string
  // defaultValues: TypeProjectInput | null
}

const EditTechnicalGrowth: React.FC<EditTechnicalGrowthProps> = ({ id }) => {
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    if (id) {
      //   const actionResult = await editTechnicalGrowth(id, event)
      //   if (actionResult) {
      //     if ("errors" in actionResult) {
      //       return setErrors({ ...actionResult.errors } as TypeError)
      //     }
      //     const message = actionResult.message
      //     if (actionResult.status) {
      //       setErrors({} as TypeError)
      //       message && toast.success(message)
      //     } else {
      //       message && toast.error(message)
      //     }
      //     formRef.current?.reset()
      //   }
      // }
    }
  }
  return <Form errors={errors} submitFunction={clientAction} submitText="Edit" />
}

export default EditTechnicalGrowth
