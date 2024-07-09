import { getAllProjects } from "@/actions/project"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const { data, status } = await getAllProjects()
  return Response.json(data, { status })
}
