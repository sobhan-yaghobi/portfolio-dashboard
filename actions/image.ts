"use server"

import supabase from "@/lib/supabase"
import { env } from "process"

const bucket = env.NEXT_PUBLIC_IMAGE_BUCKET
const token = env.NEXT_PUBLIC_SUPABASE_SECRET_KEY

export const createImage = async (path: string, file: File) => {
  if (bucket && token) {
    const { data: signedData, error: er } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path)

    if (signedData?.path) {
      const { data } = await supabase.storage
        .from(bucket)
        .uploadToSignedUrl(signedData.path, signedData?.token, file)

      if (data) {
        return { path: signedData.path, message: "image successfully created" }
      }
    }
    return { message: "create path for image failure" }
  }
  return { message: "create image failure" }
}

export const updateImage = async (path: string, file: File) => {
  if (bucket) {
    const { data } = await supabase.storage.from(bucket).update(path, file)

    if (data) {
      return { message: "update image successfully", status: true }
    }
  }
  return { message: "update image failure", status: false }
}

export const deleteImage = async (path: string) => {
  if (bucket) {
    const { data } = await supabase.storage.from(bucket).remove([path])
    if (data) {
      return { message: "remove image successfully", status: true }
    }
  }
  return { message: "remove image failure", status: false }
}
