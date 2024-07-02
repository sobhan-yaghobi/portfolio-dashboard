import React from "react"
import Typography from "@mui/material/Typography"
import Project from "@/components/template/form/Project"

const page: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Project
      </Typography>
      <Project />
    </>
  )
}

export default page
