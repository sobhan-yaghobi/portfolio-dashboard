"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { Project } from "@prisma/client"
import { TypeError } from "@/lib/types/utils.type"
import { TypeCreateSkillComponentProps } from "@/lib/types/skill.type"

import { createSkillFormAction } from "@/actions/skill/createSkill"

import Form from "./SkillForm"

const CreateSkill: React.FC<TypeCreateSkillComponentProps> = ({ projects, selectionProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(
    selectionProjects ? selectionProjects : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createSkillFormAction({
      skill: { formData: event, relatedProjects: selectedProjects },
      reValidPath: "/dashboard/skills",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
    setSelectedProjects([] as Project[])
  }

  return (
    <Form
      errors={errors}
      projects={projects}
      ref={formRef}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
      submitFunction={clientAction}
      submitText="اضافه کن"
    />
  )
}

export default CreateSkill
