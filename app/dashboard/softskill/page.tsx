import React from "react"
import prisma from "@/lib/prisma"

import { Typography } from "@mui/material"
import EmptyBox from "@/components/modules/EmptyBox"
import SoftSkillBox from "@/components/modules/SoftSkillBox"

const page: React.FC = async () => {
  const softSkillList = await prisma.softSkill.findMany()
  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        لیست مهارت های نرم
      </Typography>
      {softSkillList.length ? (
        <ul className="grid grid-cols-4 gap-3 gap-y-12 place-items-center">
          {softSkillList.map((item) => (
            <SoftSkillBox key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyBox message="لیست مهارت های نرم خالی میباشد" />
      )}
    </div>
  )
}

export default page
