"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { addProjectFormAction } from "@/actions/project/createProject"

import { TypeError } from "@/lib/definition"

import Form from "./ProjectForm"
import { Skill } from "@prisma/client"

type AddProjectProps = {
  skills: Skill[]
  selectionSkills?: Skill[]
}

const AddProject: React.FC<AddProjectProps> = ({ skills, selectionSkills }) => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    selectionSkills ? selectionSkills : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addProjectFormAction(event, selectedSkills, "/projects")
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
    <Form
      skills={skills}
      selectedSkills={selectedSkills}
      setSelectedSkills={setSelectedSkills}
      ref={formRef}
      submitText="Add Project"
      errors={errors}
      submitFunction={clientAction}
    />
  )
}

export default AddProject
