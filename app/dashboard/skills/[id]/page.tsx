import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

import Typography from "@mui/material/Typography"
import EditSkill from "@/components/template/form/skill/EditSkill"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainSkill = await prisma.skill.findUnique({ where: { id } })

  if (!mainSkill) {
    redirect("/skills")
  }

  const projectList = await prisma.project.findMany()

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit Skill
      </Typography>
      <EditSkill id={id} defaultValues={mainSkill} projectList={projectList} />
    </>
  )
}

export default Page
