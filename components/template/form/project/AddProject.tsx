"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { addProject } from "@/actions/project"

import { TypeError } from "@/lib/definition"

import Form from "./ProjectForm"

const AddProject: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addProject(event, "/projects")
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
  return (
    <Form ref={formRef} submitText="Add Project" errors={errors} submitFunction={clientAction} />
  )
}

export default AddProject
