import React from "react"

import Typography from "@mui/material/Typography"
import prisma from "@/lib/prisma"
import SkillBox from "@/components/modules/SkillBox"
import EmptyBox from "@/components/modules/EmptyBox"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const skillList = await prisma.skill.findMany()
  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        SkillList
      </Typography>
      {skillList.length ? (
        <ul className="grid grid-cols-4 gap-3 gap-y-12 place-items-center">
          {skillList.map((item) => (
            <SkillBox key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyBox message="SkillList Is Empty" />
      )}
    </div>
  )
}

export default page
