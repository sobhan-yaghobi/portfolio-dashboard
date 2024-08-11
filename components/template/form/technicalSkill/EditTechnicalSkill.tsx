"use client"

import React, { useRef, useState } from "react"

import { TypeError } from "@/lib/types/utils.type"
import { Project } from "@prisma/client"
import { TypeEditTechnicalSkillListComponentProps } from "@/lib/types/technicalSkill.type"

import { editTechnicalSkillFormAction } from "@/actions/technicalSkill/editTechnicalSkill"

import Form from "./TechnicalSkillForm"
import { showActionReturnMessage } from "@/lib/utils"

const EditTechnicalSkill: React.FC<TypeEditTechnicalSkillListComponentProps> = ({
  id,
  defaultValues,
  projectList,
  selectionProjectList,
}) => {
  const [selectedProjectList, setSelectedProjectList] = useState<Project[]>(
    selectionProjectList ? selectionProjectList : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editTechnicalSkillFormAction({
      technicalSkill: { id, formData: event, relatedProjectList: selectedProjectList },
      reValidPath: "/dashboard/technicalSkillList",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    setErrors({} as TypeError)
    setSelectedProjectList([] as Project[])
  }

  return (
    <Form
      defaultValues={defaultValues}
      errors={errors}
      projectList={projectList}
      ref={formRef}
      selectedProjectList={selectedProjectList}
      setSelectedProjectList={setSelectedProjectList}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditTechnicalSkill
