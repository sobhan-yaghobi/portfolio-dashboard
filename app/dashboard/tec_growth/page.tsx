import React from "react"
import prisma from "@/lib/prisma"

import CreateTechnicalGrowthForm from "@/components/template/form/TechnicalGrowth/CreateTechnicalGrowth"
import TechnicalGrowthTimeLine from "@/components/template/TechnicalGrowthTimeLine"
import { Button, Divider, Typography } from "@mui/material"
import Link from "next/link"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const technicalGrowthList = await prisma.technicalGrowth.findMany({ orderBy: { order: "asc" } })

  return (
    <div>
      <section className="min-h-screen flex flex-col">
        <Typography variant="h4" component="h2" className="flex justify-between">
          <span>لیست رشد فنی</span>

          <Button variant="contained">
            <Link href={"#add"}>رشد فنی جدید</Link>
          </Button>
        </Typography>

        <TechnicalGrowthTimeLine technicalGrowthList={technicalGrowthList} />
      </section>

      <div className="my-10">
        <Divider />
      </div>

      <section id="add">
        <Typography component="h2" variant="h4">
          اضافه کردن رشد فنی جدید
        </Typography>
        <CreateTechnicalGrowthForm path="/tec_growth" />
      </section>
    </div>
  )
}

export default page
