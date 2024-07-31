"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { editProjectFormAction } from "@/actions/project/editProject"

import { TypeError } from "@/lib/definition"
import { Skill } from "@prisma/client"
import { EditProjectComponentProps } from "@/lib/types"

import Form from "./ProjectForm"

const EditProject: React.FC<EditProjectComponentProps> = ({
  id,
  defaultValues,
  skills,
  selectionSkills,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    selectionSkills ? selectionSkills : ([] as Skill[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await editProjectFormAction({
      project: {
        id,
        formData: event,
        relatedSkills: selectedSkills,
      },
      reValidPath: "/dashboard/projects",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult })
  }

  return (
    <Form
      defaultValues={defaultValues}
      errors={errors}
      ref={formRef}
      skills={skills}
      selectedSkills={selectedSkills}
      setSelectedSkills={setSelectedSkills}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditProject
