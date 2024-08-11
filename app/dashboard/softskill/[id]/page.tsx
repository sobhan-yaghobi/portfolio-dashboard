import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

import Typography from "@mui/material/Typography"
import EditSoftSkill from "@/components/template/form/softSkill/EditSoftSkill"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainSoftSkill = await prisma.softSkill.findUnique({
    where: { id },
  })

  if (!mainSoftSkill) {
    redirect("/softskilllist")
  }

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        ویرایش مهارت نرم
      </Typography>
      <EditSoftSkill id={id} defaultValues={mainSoftSkill} />
    </>
  )
}

export default Page
