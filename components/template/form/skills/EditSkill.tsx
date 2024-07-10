"use client"

import { editSkill } from "@/actions/skills"
import { TypeSkillInput } from "@/lib/types"
import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import Form from "./Form"
import { TypeError } from "@/actions/definition"
import { Project } from "@prisma/client"

type EditSkillsProps = {
  id: string
  defaultValues: TypeSkillInput | null
  projects: Project[]
  selectionProjects?: Project[]
}

const EditSkill: React.FC<EditSkillsProps> = ({
  id,
  defaultValues,
  projects,
  selectionProjects,
}) => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(
    selectionProjects ? selectionProjects : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    if (id) {
      const actionResult = await editSkill(id, event)
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
      ref={formRef}
      submitText="Edit Skill"
      errors={errors}
      submitFunction={clientAction}
      defaultValues={defaultValues}
      projects={projects}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
    />
  )
}

export default EditSkill
