import React from "react"
import Typography from "@mui/material/Typography"
import CreateSkillForm from "@/components/template/form/skill/CreateSkill"
import prisma from "@/lib/prisma"

const page: React.FC = async () => {
  const projects = await prisma.project.findMany()
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        اضافه کردن مهارت
      </Typography>
      <CreateSkillForm projects={projects} />
    </>
  )
}

export default page
