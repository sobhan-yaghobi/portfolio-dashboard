import React from "react"
import Typography from "@mui/material/Typography"
import AddSkills from "@/components/template/form/skills/AddSkill"

const page: React.FC = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Add Skills
      </Typography>
      <AddSkills />
    </>
  )
}

export default page
