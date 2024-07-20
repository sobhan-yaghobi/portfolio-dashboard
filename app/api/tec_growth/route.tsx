import { get } from "@/actions/TechnicalGrowth"
import { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async () => {
  const data = await get()
  return Response.json(data, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
