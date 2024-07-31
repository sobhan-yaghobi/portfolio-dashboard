import React from "react"

import PasswordForm from "@/components/template/form/Password"
import Typography from "@mui/material/Typography"

const page: React.FC = async () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        گذرواژه
      </Typography>
      <PasswordForm />
    </>
  )
}

export default page
