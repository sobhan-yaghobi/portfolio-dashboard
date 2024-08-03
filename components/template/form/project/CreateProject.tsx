"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"
import { Skill } from "@prisma/client"
import { TypeCreateProjectComponentProps } from "@/lib/types/project.type"

import { createProjectFormAction } from "@/actions/project/createProject"

import Form from "./ProjectForm"

const CreateProject: React.FC<TypeCreateProjectComponentProps> = ({
  skills,
  selectionSkillList,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    selectionSkillList ? selectionSkillList : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createProjectFormAction({
      project: { formData: event, relatedSkillList: selectedSkills },
      reValidPath: "/dashboard/projects",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetFrom } })
  }

  const resetFrom = () => {
    formRef.current?.reset()
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
