"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import { showActionReturnMessage } from "@/lib/utils"

import { editProjectFormAction } from "@/actions/project/editProject"

import { TypeError } from "@/lib/definition"
import { TypeProjectInput } from "@/lib/types"
import { Skill } from "@prisma/client"

import Form from "./ProjectForm"

type EditProjectProps = {
  id: string
  defaultValues: TypeProjectInput | null
  skills: Skill[]
  selectionSkills?: Skill[]
}

const EditProject: React.FC<EditProjectProps> = ({
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
    if (!id) return toast.error("Project Id not found")

    const actionResult = await editProjectFormAction({
      project: {
        id,
        formData: event,
        relatedSkills: selectedSkills,
      },
      reValidPath: "/dashboard/projects",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage(actionResult)

    formRef.current?.reset()
  }

  return (
    <Form
      skills={skills}
      selectedSkills={selectedSkills}
      setSelectedSkills={setSelectedSkills}
      ref={formRef}
      submitText="Add Project"
      errors={errors}
      submitFunction={clientAction}
      defaultValues={defaultValues}
    />
  )
}

export default EditProject
