"use client"

import React, { useRef, useState } from "react"
import Form from "./Form"
import { Project } from "@prisma/client"
import { addSkill } from "@/actions/skills"
import { toast } from "react-toastify"
import { TypeError } from "@/actions/definition"

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
    const actionResult = await addSkill(event)
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
