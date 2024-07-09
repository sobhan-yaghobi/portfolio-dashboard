import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ProjectCreateInput } from "@/lib/types"

import Typography from "@mui/material/Typography"
import EditProject from "@/components/template/form/project/EditProject"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainProject = await prisma.project.findUnique({ where: { id }, select: ProjectCreateInput })

  if (!mainProject) {
    redirect("/projects")
  }

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit Project
      </Typography>
      <EditProject id={id} defaultValues={mainProject} />
    </>
  )
}

export default Page
