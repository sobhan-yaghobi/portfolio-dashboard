import { get } from "@/actions/TechnicalGrowth"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const data = await get()
  return Response.json(data, { status: 201 })
}
