"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"
import { TechnicalSkill } from "@prisma/client"
import { TypeEditProjectComponentProps } from "@/lib/types/project.type"

import { editProjectFormAction } from "@/actions/project/editProject"

import Form from "./ProjectForm"

const EditProject: React.FC<TypeEditProjectComponentProps> = ({
  id,
  defaultValues,
  technicalSkillList,
  selectionTechnicalSkillList,
}) => {
  const [selectedTechnicalSkillList, setSelectedTechnicalSkillList] = useState<TechnicalSkill[]>(
    selectionTechnicalSkillList ? selectionTechnicalSkillList : ([] as TechnicalSkill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editProjectFormAction({
      project: {
        id,
        formData: event,
        relatedTechnicalSkillList: selectedTechnicalSkillList,
      },
      reValidPath: "/dashboard/projectList",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult })
  }

  return (
    <Form
      defaultValues={defaultValues}
      errors={errors}
      ref={formRef}
      technicalSkillList={technicalSkillList}
      selectedTechnicalSkillList={selectedTechnicalSkillList}
      setSelectedTechnicalSkillList={setSelectedTechnicalSkillList}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditProject
