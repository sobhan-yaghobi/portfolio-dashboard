import ProjectBox from "@/components/modules/ProjectBox"
import prisma from "@/lib/prisma"
import { Typography } from "@mui/material"
import React from "react"

const page: React.FC = async () => {
  const projects = await prisma.project.findMany()

  return (
    <div>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit profile
      </Typography>
      <ul className="grid grid-cols-3 gap-6 place-items-center">
        {projects.map((item) => (
          <ProjectBox key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default page
