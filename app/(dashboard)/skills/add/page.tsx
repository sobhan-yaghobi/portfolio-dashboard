import React from "react"
import Typography from "@mui/material/Typography"
import AddSkills from "@/components/template/form/skill/AddSkill"
import prisma from "@/lib/prisma"

const page: React.FC = async () => {
  const projects = await prisma.project.findMany()
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Skills
      </Typography>
      <AddSkills projects={projects} />
    </>
  )
}

export default page
