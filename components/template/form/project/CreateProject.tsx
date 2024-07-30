"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/definition"
import { Skill } from "@prisma/client"

import { createProjectFormAction } from "@/actions/project/createProject"

import Form from "./ProjectForm"

type CreateProjectProps = {
  skills: Skill[]
  selectionSkills?: Skill[]
}

const CreateProject: React.FC<CreateProjectProps> = ({ skills, selectionSkills }) => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    selectionSkills ? selectionSkills : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createProjectFormAction(event, selectedSkills, "/projects")

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetFrom } })
    formRef.current?.reset()
  }

  const resetFrom = () => {
    setErrors({} as TypeError)
    setSelectedSkills([] as Skill[])
  }

  return (
    <Form
      errors={errors}
      ref={formRef}
      skills={skills}
      selectedSkills={selectedSkills}
      setSelectedSkills={setSelectedSkills}
      submitFunction={clientAction}
      submitText="اضافه کن"
    />
  )
}

export default CreateProject
