import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { decrypt } from "@/auth/session"

import { AdminProfileInput } from "@/lib/types"

import Typography from "@mui/material/Typography"
import ProfileForm from "@/components/template/form/Profile"

export default async function Home() {
  const cookie = cookies().get("session")?.value
  const sessionResult = await decrypt(cookie)
  const admin = await prisma.admin.findUnique({
    where: { id: (sessionResult?.id as string) || "" },
    select: AdminProfileInput,
  })

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        پروفایل
      </Typography>
      <ProfileForm
        id={admin && typeof sessionResult?.id === "string" ? sessionResult?.id : undefined}
        defaultValues={admin}
      />
    </>
  )
}
