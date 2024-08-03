"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"
import { Skill } from "@prisma/client"
import { TypeCreateProjectComponentProps } from "@/lib/types/project.type"

import { createProjectFormAction } from "@/actions/project/createProject"

import Form from "./ProjectForm"

const CreateProject: React.FC<TypeCreateProjectComponentProps> = ({
  skillList,
  selectionSkillList,
}) => {
  const [selectedSkillList, setSelectedSkillList] = useState<Skill[]>(
    selectionSkillList ? selectionSkillList : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createProjectFormAction({
      project: { formData: event, relatedSkillList: selectedSkillList },
      reValidPath: "/dashboard/projectList",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetFrom } })
  }

  const resetFrom = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
    setSelectedSkillList([] as Skill[])
  }

  return (
    <Form
      errors={errors}
      ref={formRef}
      skillList={skillList}
      selectedSkillList={selectedSkillList}
      setSelectedSkillList={setSelectedSkillList}
      submitFunction={clientAction}
      submitText="اضافه کن"
    />
  )
}

export default CreateProject
