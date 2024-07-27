"use server"

import { TypeReturnSererAction } from "@/lib/definition"
import supabase from "@/lib/supabase"
import { env } from "process"

const bucket = env.NEXT_PUBLIC_IMAGE_BUCKET
const token = env.NEXT_PUBLIC_SUPABASE_SECRET_KEY

type uploadImageWithSignedUrl = {
  image: {
    file: File
    path: string
  }
  token: string
  bucket: string
}

export const createImage = async (
  imagePath: string,
  file: File
): Promise<TypeReturnSererAction> => {
  if (!bucket || !token) return { message: "Token or bucket name not found", status: false }

  const createSignedUrlResult = await createSignedUploadUrl(imagePath, bucket)

  if (createSignedUrlResult.signedData) {
    const { path, token } = createSignedUrlResult.signedData
    return uploadImageWithSignedUrl({ image: { file, path }, bucket, token })
  }

  return { message: "Create path for image failure", status: false }
}

const createSignedUploadUrl = async (imagePath: string, bucket: string) => {
  const { data: signedData, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(imagePath)

  if (signedData) return { signedData }

  return { error }
}

const uploadImageWithSignedUrl = async ({
  image,
  token,
  bucket,
}: uploadImageWithSignedUrl): Promise<TypeReturnSererAction> => {
  const { data: imageUploadResult } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(image.path, token, image.file)

  if (imageUploadResult)
    return { message: "Image successfully created", status: true, data: imageUploadResult.path }

  return { message: "Image created failure", status: false }
}

export const updateImage = async (path: string, file: File): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "Bucket name not found" }

  const { data } = await supabase.storage.from(bucket).update(path, file)

  if (data) return { message: "Update image successfully", status: true }

  return { message: "Update image failure", status: false }
}

export const deleteImage = async (path: string): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "Bucket name not found" }

  const { data } = await supabase.storage.from(bucket).remove([path])

  if (data) return { message: "Remove image successfully", status: true }

  return { message: "Remove image failure", status: false }
}
