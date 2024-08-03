"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { Project } from "@prisma/client"
import { TypeError } from "@/lib/types/utils.type"
import { TypeCreateSkillComponentProps } from "@/lib/types/skill.type"

import { createSkillFormAction } from "@/actions/skill/createSkill"

import Form from "./SkillForm"

const CreateSkill: React.FC<TypeCreateSkillComponentProps> = ({
  projectList,
  selectionProjectList,
}) => {
  const [selectedProjectList, setSelectedProjectList] = useState<Project[]>(
    selectionProjectList ? selectionProjectList : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createSkillFormAction({
      skill: { formData: event, relatedProjectList: selectedProjectList },
      reValidPath: "/dashboard/skills",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
    setSelectedProjectList([] as Project[])
  }

  return (
    <Form
      errors={errors}
      projectList={projectList}
      ref={formRef}
      selectedProjectList={selectedProjectList}
      setSelectedProjectList={setSelectedProjectList}
      submitFunction={clientAction}
      submitText="اضافه کن"
    />
  )
}

export default CreateSkill
