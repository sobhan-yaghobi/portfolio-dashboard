import React from "react"
import Typography from "@mui/material/Typography"
import Skills from "@/components/template/form/Skills"

const page: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Skills
      </Typography>
      <Skills />
    </>
  )
}

export default page
