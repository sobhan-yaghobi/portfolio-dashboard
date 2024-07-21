"use server"

import supabase from "@/lib/supabase"
import { env } from "process"

const bucket = env.NEXT_PUBLIC_IMAGE_BUCKET
const token = env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
const url = env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/" + bucket

export const createImage = async (path: string, file: File) => {
  if (bucket && token && url) {
    const { data: signedData, error: er } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path)

    if (signedData?.path) {
      const { data } = await supabase.storage
        .from(bucket)
        .uploadToSignedUrl(signedData.path, signedData?.token, file)

      if (data) {
        return { path: `${url}/${signedData.path}`, message: "image successfully created" }
      }
    }
    return { message: "create path for image failure" }
  }
  return { message: "create image failure" }
}
