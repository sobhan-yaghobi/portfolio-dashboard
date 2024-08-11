import CreateSoftSkill from "@/components/template/form/softSkill/CreateSoftSkill"
import SoftSkillForm from "@/components/template/form/softSkill/SoftSkillForm"
import { Typography } from "@mui/material"
import React from "react"

const page = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        اضافه کردن مهارت
      </Typography>
      <CreateSoftSkill submitText="اضافه کن" />
    </>
  )
}

export default page
