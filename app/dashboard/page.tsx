import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { decrypt } from "@/auth/session"

import { AdminProfileInputWithId } from "@/lib/types"

import Typography from "@mui/material/Typography"
import ProfileForm from "@/components/template/form/Profile"

export default async function Home() {
  const cookie = cookies().get("session")?.value
  const sessionResult = await decrypt(cookie)
  const admin = await prisma.admin.findUnique({
    where: { id: (sessionResult?.id as string) || "" },
    select: AdminProfileInputWithId,
  })

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        پروفایل
      </Typography>
      <ProfileForm id={admin?.id} defaultValues={admin} />
    </>
  )
}
