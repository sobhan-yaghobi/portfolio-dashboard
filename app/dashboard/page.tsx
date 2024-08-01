import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { getAdminId } from "@/lib/utils"

import { AdminProfileInput } from "@/lib/types"

import Typography from "@mui/material/Typography"
import ProfileForm from "@/components/template/form/Profile"

export default async function Home() {
  const token = cookies().get("session")?.value
  const adminId = await getAdminId(token)
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: AdminProfileInput,
  })

  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        پروفایل
      </Typography>
      <ProfileForm defaultValues={admin} />
    </>
  )
}
