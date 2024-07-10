"use client"

import React, { useState } from "react"
import Form from "./Form"
import { Project } from "@prisma/client"

type AddSkillProps = {
  projects: Project[]
  selectionProjects?: Project[]
}

const AddSkill: React.FC<AddSkillProps> = ({ projects, selectionProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(
    selectionProjects ? selectionProjects : ([] as Project[])
  )

  return (
    <Form
      projects={projects}
      selectedProjects={selectedProjects}
      setSelectedProjects={setSelectedProjects}
    />
  )
}

export default AddSkill
