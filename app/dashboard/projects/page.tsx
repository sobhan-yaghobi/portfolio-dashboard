import React from "react"
import prisma from "@/lib/prisma"

import EmptyBox from "@/components/modules/EmptyBox"
import ProjectBox from "@/components/modules/ProjectBox"
import { Typography } from "@mui/material"

export const dynamic = "force-dynamic"

const page: React.FC = async () => {
  const projects = await prisma.project.findMany()

  return (
    <div className="h-full flex flex-col">
      <Typography variant="h4" component="h2" className="mb-8">
        پروژه ها
      </Typography>
      {projects.length ? (
        <ul className="grid grid-cols-3 gap-6 gap-y-12 place-items-center">
          {projects.map((item) => (
            <div
              key={item.id}
              className={`${
                item.title.length >= 70 || item.description.length >= 300
                  ? "col-span-3"
                  : "col-span-1"
              } w-full`}
            >
              <ProjectBox {...item} />
            </div>
          ))}
        </ul>
      ) : (
        <EmptyBox message="Project Is Empty" />
      )}
    </div>
  )
}

export default page
