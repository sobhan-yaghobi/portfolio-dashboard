"use client"

import React, { useRef, useState } from "react"
import { editSkill } from "@/actions/skill"
import { TypeError } from "@/actions/definition"
import { Project } from "@prisma/client"
import { toast } from "react-toastify"

import { TypeSkillInput } from "@/lib/types"

import Form from "./SkillForm"

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
      const actionResult = await editSkill(id, event, selectedProjects, "/skills")
      if (actionResult) {
        if ("errors" in actionResult) {
          return setErrors({ ...actionResult.errors } as TypeError)
        }

        const message = actionResult.message
        if (actionResult.status) {
          setErrors({} as TypeError)
          setSelectedProjects([] as Project[])
          message && toast.success(message)
        } else {
          message && toast.error(message)
        }
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
