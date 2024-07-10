import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ProjectCreateInput, SkillCreateInput } from "@/lib/types"

import Typography from "@mui/material/Typography"
import EditSkill from "@/components/template/form/skills/EditSkill"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainSkills = await prisma.skills.findUnique({ where: { id }, select: SkillCreateInput })

  if (!mainSkills) {
    redirect("/skills")
  }

  const projects = await prisma.project.findMany()

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit Project
      </Typography>
      <EditSkill id={id} defaultValues={mainSkills} projects={projects} />
    </>
  )
}

export default Page
