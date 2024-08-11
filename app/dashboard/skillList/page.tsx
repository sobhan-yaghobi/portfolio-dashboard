import React from "react"

import Typography from "@mui/material/Typography"
import prisma from "@/lib/prisma"
import TechnicalSkillBox from "@/components/modules/TechnicalSkillBox"
import EmptyBox from "@/components/modules/EmptyBox"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const technicalSkillList = await prisma.technicalSkill.findMany()
  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        TechnicalSkillList
      </Typography>
      {technicalSkillList.length ? (
        <ul className="grid grid-cols-4 gap-3 gap-y-12 place-items-center">
          {technicalSkillList.map((item) => (
            <TechnicalSkillBox key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyBox message="TechnicalSkillList Is Empty" />
      )}
    </div>
  )
}

export default page
