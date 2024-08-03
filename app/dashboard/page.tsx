import prisma from "@/lib/prisma"
import { getAdminId } from "@/lib/utils"
import { getToken } from "@/auth/serverFunctions"
import dynamic from "next/dynamic"

import { AdminProfileInput } from "@/lib/types/profile.type"

import Typography from "@mui/material/Typography"
const ProfileForm = dynamic(() => import("@/components/template/form/Profile"), { ssr: false })

export default async function Home() {
  const token = getToken()?.value
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
