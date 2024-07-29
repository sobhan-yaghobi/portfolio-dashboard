"use server"

import { TypeReturnSererAction } from "@/lib/definition"
import supabase from "@/lib/supabase"
import { getImagePath } from "@/lib/utils"
import { env } from "process"

const bucket = env.NEXT_PUBLIC_IMAGE_BUCKET

type TypeUploadImageParam = {
  image: {
    file: File
    path: string
  }
  bucket: string
}

export const createImage = async (
  imagePath: string,
  file: File
): Promise<TypeReturnSererAction> => {
  if (!bucket) return { message: "bucket name not found", status: false }

  return await uploadImage({ image: { file, path: imagePath }, bucket })
}

const uploadImage = async ({
  image,
  bucket,
}: TypeUploadImageParam): Promise<TypeReturnSererAction> => {
  const { data: imageUploadResult } = await supabase.storage
    .from(bucket)
    .upload(image.path, image.file)

  if (imageUploadResult) {
    return getImageUrl(imageUploadResult.path, bucket)
  }

  return { message: "Image created failure", status: false }
}

const getImageUrl = (imagePath: string, bucket: string) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(imagePath)
  return { message: "Image successfully created", status: true, data: publicUrl }
}

export const updateImage = async (imageUrl: string, file: File): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "Bucket name not found" }

  const imagePath = getImagePath(imageUrl)
  if (imagePath) {
    const { data } = await supabase.storage.from(bucket).update(imagePath, file)

    if (data) return { message: "Update image successfully", status: true }
  }

  return { message: "Update image failure", status: false }
}

export const deleteImage = async (imageUrl: string): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "Bucket name not found" }

  const imagePath = getImagePath(imageUrl)
  if (imagePath) {
    const { data } = await supabase.storage.from(bucket).remove([imagePath])

    if (data) return { message: "Remove image successfully", status: true }
  }

  return { message: "Remove image failure", status: false }
}
