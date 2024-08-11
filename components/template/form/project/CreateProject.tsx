"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"
import { TechnicalSkill } from "@prisma/client"
import { TypeCreateProjectComponentProps } from "@/lib/types/project.type"

import { createProjectFormAction } from "@/actions/project/createProject"

import Form from "./ProjectForm"

const CreateProject: React.FC<TypeCreateProjectComponentProps> = ({
  technicalSkillList,
  selectionTechnicalSkillList,
}) => {
  const [selectedTechnicalSkillList, setSelectedTechnicalSkillList] = useState<TechnicalSkill[]>(
    selectionTechnicalSkillList ? selectionTechnicalSkillList : ([] as TechnicalSkill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createProjectFormAction({
      project: { formData: event, relatedTechnicalSkillList: selectedTechnicalSkillList },
      reValidPath: "/dashboard/projectList",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetFrom } })
  }

  const resetFrom = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
    setSelectedTechnicalSkillList([] as TechnicalSkill[])
  }

  return (
    <Form
      errors={errors}
      ref={formRef}
      technicalSkillList={technicalSkillList}
      selectedTechnicalSkillList={selectedTechnicalSkillList}
      setSelectedTechnicalSkillList={setSelectedTechnicalSkillList}
      submitFunction={clientAction}
      submitText="اضافه کن"
    />
  )
}

export default CreateProject
