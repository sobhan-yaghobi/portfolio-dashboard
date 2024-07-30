"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { TypeError } from "@/lib/definition"

import Form from "./ProjectForm"
import { editProjectFormAction } from "@/actions/project/editProject"
import { TypeProjectInput } from "@/lib/types"
import { Skill } from "@prisma/client"

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
    if (id) {
      const actionResult = await editProjectFormAction({
        project: {
          id,
          formData: event,
          relatedSkills: selectedSkills,
        },
        reValidPath: "/dashboard/projects",
      })
      if (actionResult) {
        if ("errors" in actionResult) {
          return setErrors({ ...actionResult.errors } as TypeError)
        }

        const message = actionResult.message
        if (actionResult.status) {
          setErrors({} as TypeError)
          message && toast.success(message)
        } else {
          message && toast.error(message)
        }
        formRef.current?.reset()
      }
    }
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
