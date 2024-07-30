import React from "react"
import prisma from "@/lib/prisma"

import CreateTechnicalGrowthForm from "@/components/template/form/TechnicalGrowth/CreateTechnicalGrowth"
import TechGrTimeLine from "@/components/template/TechGrTimeLine"
import { Button, Divider, Typography } from "@mui/material"
import Link from "next/link"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const techs = await prisma.technicalGrowth.findMany({ orderBy: { order: "asc" } })
  return (
    <div>
      <section className="min-h-screen flex flex-col">
        <Typography variant="h4" component="h2" className="mt-0 flex justify-between">
          <span>Add Technical Growth</span>
          <Button variant="contained">
            <Link href={"#add"}>New</Link>
          </Button>
        </Typography>
        <TechGrTimeLine techs={techs} />
      </section>

      <Divider className="mb-20 mt-10" />

      <section id="add">
        <Typography variant="h4" component="h2" className="mt-0">
          Add Technical Growth
        </Typography>
        <CreateTechnicalGrowthForm path="/tec_growth" />
      </section>
    </div>
  )
}

export default page
