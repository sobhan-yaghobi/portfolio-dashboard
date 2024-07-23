"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { TypeError } from "@/actions/definition"

import Form from "./ProjectForm"
import { editProject } from "@/actions/project"
import { TypeProjectInput } from "@/lib/types"

type EditProjectProps = {
  id: string
  defaultValues: TypeProjectInput | null
}

const EditProject: React.FC<EditProjectProps> = ({ id, defaultValues }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    if (id) {
      const actionResult = await editProject(id, event)
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
        formRef.current?.reset()
      }
    }
  }
  return (
    <Form
      ref={formRef}
      submitText="Add Project"
      errors={errors}
      submitFunction={clientAction}
      defaultValues={defaultValues}
    />
  )
}

export default EditProject
