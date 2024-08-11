import React from "react"
import Typography from "@mui/material/Typography"
import CreateTechnicalSkillForm from "@/components/template/form/technicalSkill/CreateTechnicalSkill"
import prisma from "@/lib/prisma"

const page: React.FC = async () => {
  const projectList = await prisma.project.findMany()
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        اضافه کردن مهارت
      </Typography>
      <CreateTechnicalSkillForm projectList={projectList} />
    </>
  )
}

export default page
