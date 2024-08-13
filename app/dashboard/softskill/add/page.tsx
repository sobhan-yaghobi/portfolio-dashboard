import React from "react"

import { Typography } from "@mui/material"
import CreateSoftSkill from "@/components/template/form/softSkill/CreateSoftSkill"

const page = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        اضافه کردن مهارت
      </Typography>
      <CreateSoftSkill />
    </>
  )
}

export default page
