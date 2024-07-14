"use client"

import React, { useState } from "react"

import { TypeError } from "@/actions/definition"

import Form from "./Form"

const AddTechnicalGrowth: React.FC = () => {
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    // const actionResult = await addTechnical(event)
    // if (actionResult) {
    //   if (!actionResult.status) {
    //     formRef.current?.reset()
    //   }
    //   if ("errors" in actionResult) {
    //     setErrors({ ...actionResult.errors } as TypeError)
    //   }
    // }
  }
  return <Form errors={errors} submitFunction={clientAction} submitText="Add" />
}

export default AddTechnicalGrowth
