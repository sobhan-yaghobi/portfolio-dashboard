"use client"

import React, { useRef, useState } from "react"
import { Project } from "@prisma/client"
import { addSkillFormAction } from "@/actions/skill"
import { toast } from "react-toastify"

import { TypeError } from "@/lib/definition"

import Form from "./SkillForm"

type AddSkillProps = {
  projects: Project[]
  selectionProjects?: Project[]
}

const AddSkill: React.FC<AddSkillProps> = ({ projects, selectionProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(
    selectionProjects ? selectionProjects : ([] as Project[])
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addSkillFormAction(event, selectedProjects, "/skills")
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
      formRef.current?.reset()
    }
  }

  return (
    <Form
      ref={formRef}
      submitText="Add Project"
      errors={errors}
      submitFunction={clientAction}
      projects={projects}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
    />
  )
}

export default AddSkill
