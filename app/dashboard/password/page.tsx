import React from "react"
import { cookies } from "next/headers"
import { decrypt } from "@/auth/session"

import PasswordForm from "@/components/template/form/Password"
import Typography from "@mui/material/Typography"

const page = async () => {
  const cookie = cookies().get("session")?.value
  const sessionResult = await decrypt(cookie)

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        گذرواژه
      </Typography>
      <PasswordForm id={typeof sessionResult?.id === "string" ? sessionResult?.id : undefined} />
    </>
  )
}

export default page
