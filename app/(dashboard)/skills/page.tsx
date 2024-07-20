import React from "react"

import Typography from "@mui/material/Typography"
import prisma from "@/lib/prisma"
import SkillBox from "@/components/modules/SkillBox"
import EmptyBox from "@/components/modules/EmptyBox"

const page: React.FC = async () => {
  const skills = await prisma.skills.findMany()
  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        Skills
      </Typography>
      {skills.length ? (
        <ul className="grid grid-cols-4 gap-3 gap-y-12 place-items-center">
          {skills.map((item) => (
            <SkillBox key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyBox message="Skills Is Empty" />
      )}
    </div>
  )
}

export default page
