import React from "react"
import Typography from "@mui/material/Typography"
import AddProject from "@/components/template/form/project/CreateProject"
import prisma from "@/lib/prisma"

const page: React.FC = async () => {
  const skills = await prisma.skill.findMany()
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Project
      </Typography>
      <AddProject skills={skills} />
    </>
  )
}

export default page
