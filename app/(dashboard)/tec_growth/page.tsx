import AddTechnicalGrowth from "@/components/template/form/TechnicalGrowth/AddTechnicalGrowth"
import TechGrTimeLine from "@/components/template/TechGrTimeLine"
import { Typography } from "@mui/material"
import React from "react"

const page = () => {
  return (
    <div>
      <Typography variant="h4" component="h2" className="mt-0">
        Add Technical Growth
      </Typography>
      <AddTechnicalGrowth />
      <TechGrTimeLine />
    </div>
  )
}

export default page
