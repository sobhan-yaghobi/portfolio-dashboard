import React from "react"
import prisma from "@/lib/prisma"

import EmptyBox from "@/components/modules/EmptyBox"
import ProjectBox from "@/components/modules/ProjectBox"
import { Typography } from "@mui/material"

const page: React.FC = async () => {
  const projects = await prisma.project.findMany()

  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        Projects
      </Typography>
      {projects.length ? (
        <ul className="grid grid-cols-3 gap-6 gap-y-12 place-items-center">
          {projects.map((item) => (
            <ProjectBox key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyBox message="Project Is Empty" />
      )}
    </div>
  )
}

export default page
