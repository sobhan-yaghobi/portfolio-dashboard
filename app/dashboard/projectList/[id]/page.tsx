import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

import Typography from "@mui/material/Typography"
import EditProject from "@/components/template/form/project/EditProject"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainProject = await prisma.project.findUnique({ where: { id } })

  if (!mainProject) {
    redirect("/projectList")
  }

  const skills = await prisma.skill.findMany()

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        ویرایش پروژه
      </Typography>
      <EditProject id={id} defaultValues={mainProject} skills={skills} />
    </>
  )
}

export default Page
