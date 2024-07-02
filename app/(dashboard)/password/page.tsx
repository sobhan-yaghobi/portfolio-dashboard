import React from "react"

import Typography from "@mui/material/Typography"
import PasswordForm from "@/components/template/form/Password"

const page = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Password
      </Typography>
      <PasswordForm />
    </>
  )
}

export default page
