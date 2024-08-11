import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

import Typography from "@mui/material/Typography"
import EditTechnicalSkill from "@/components/template/form/technicalSkill/EditTechnicalSkill"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainTechnicalSkill = await prisma.technicalSkill.findUnique({ where: { id } })

  if (!mainTechnicalSkill) {
    redirect("/technicalSkillList")
  }

  const projectList = await prisma.project.findMany()

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit TechnicalSkill
      </Typography>
      <EditTechnicalSkill id={id} defaultValues={mainTechnicalSkill} projectList={projectList} />
    </>
  )
}

export default Page
