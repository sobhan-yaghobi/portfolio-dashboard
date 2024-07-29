import React from "react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

import Typography from "@mui/material/Typography"
import EditTechnicalGrowth from "@/components/template/form/TechnicalGrowth/EditTechnicalGrowth"
import { TechnicalGrowthInput } from "@/lib/types"

const Page: React.FC<{
  params: { [slug: string]: string }
}> = async ({ params }) => {
  const id = params?.id
  const mainTechnicalGrowth = await prisma.technicalGrowth.findUnique({
    where: { id },
    select: TechnicalGrowthInput,
  })

  if (!mainTechnicalGrowth) {
    redirect("/tec_growth")
  }

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit Technical Growth
      </Typography>
      <EditTechnicalGrowth id={id} defaultValues={mainTechnicalGrowth} />
    </>
  )
}

export default Page
