import React from "react"
import Typography from "@mui/material/Typography"
import AddProject from "@/components/template/form/project/AddProject"

const page: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Project
      </Typography>
      <AddProject />
    </>
  )
}

export default page
