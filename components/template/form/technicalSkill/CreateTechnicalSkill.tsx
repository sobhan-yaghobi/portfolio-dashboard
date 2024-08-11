"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { Project } from "@prisma/client"
import { TypeError } from "@/lib/types/utils.type"
import { TypeCreateTechnicalSkillComponentProps } from "@/lib/types/technicalSkill.type"

import { createTechnicalSkillFormAction } from "@/actions/technicalSkill/createTechnicalSkill"

import Form from "./TechnicalSkillForm"

const CreateTechnicalSkill: React.FC<TypeCreateTechnicalSkillComponentProps> = ({
  projectList,
  selectionProjectList,
}) => {
  const [selectedProjectList, setSelectedProjectList] = useState<Project[]>(
    selectionProjectList ? selectionProjectList : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createTechnicalSkillFormAction({
      technicalSkill: { formData: event, relatedProjectList: selectedProjectList },
      reValidPath: "/dashboard/technicalSkillList",
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

export default CreateTechnicalSkill
