"use client"

import React, { useRef, useState } from "react"

import { TypeError } from "@/lib/types/utils.type"
import { Project } from "@prisma/client"
import { TypeEditSkillsComponentProps } from "@/lib/types/skill.type"

import { editSkillFormAction } from "@/actions/skill/editSkill"

import Form from "./SkillForm"
import { showActionReturnMessage } from "@/lib/utils"

const EditSkill: React.FC<TypeEditSkillsComponentProps> = ({
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
    const actionResult = await editSkillFormAction({
      skill: { id, formData: event, relatedProjects: selectedProjects },
      reValidPath: "/dashboard/skills",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    setErrors({} as TypeError)
    setSelectedProjects([] as Project[])
  }

  return (
    <Form
      defaultValues={defaultValues}
      errors={errors}
      projects={projects}
      ref={formRef}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
      submitFunction={clientAction}
      submitText="ویرایش"
    />
  )
}

export default EditSkill
