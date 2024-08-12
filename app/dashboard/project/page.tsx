import React from "react"
import prisma from "@/lib/prisma"

import EmptyBox from "@/components/modules/EmptyBox"
import ProjectBox from "@/components/modules/ProjectBox"
import { Typography } from "@mui/material"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const projectList = await prisma.project.findMany()

  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        پروژه ها
      </Typography>
      {projectList.length ? (
        <ul className="grid grid-cols-3 gap-3 place-items-center">
          {projectList.map((project) => (
            <div key={project.id} className="col-span-1 w-full h-[400px]">
              <ProjectBox project={project} />
            </div>
          ))}
        </ul>
      ) : (
        <EmptyBox message="لیست پروژه ها خالی میباشد" />
      )}
    </div>
  )
}

export default page
