"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"
import { Skill } from "@prisma/client"
import { TypeEditProjectComponentProps } from "@/lib/types/project.type"

import { editProjectFormAction } from "@/actions/project/editProject"

import Form from "./ProjectForm"

const EditProject: React.FC<TypeEditProjectComponentProps> = ({
  id,
  defaultValues,
  skillList,
  selectionSkillList,
}) => {
  const [selectedSkillList, setSelectedSkillList] = useState<Skill[]>(
    selectionSkillList ? selectionSkillList : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editProjectFormAction({
      project: {
        id,
        formData: event,
        relatedSkillList: selectedSkillList,
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
      skillList={skillList}
      selectedSkillList={selectedSkillList}
      setSelectedSkillList={setSelectedSkillList}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditProject
