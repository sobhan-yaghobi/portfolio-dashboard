import React from "react"
import Typography from "@mui/material/Typography"
import EditProject from "@/components/template/form/project/EditProject"
import prisma from "@/lib/prisma"
import { ProjectCreateInput } from "@/lib/types"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainProject = await prisma.project.findUnique({ where: { id }, select: ProjectCreateInput })
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
