"use server"

import supabase from "@/lib/supabase"
import { getImagePath, updateUrl } from "@/lib/utils"
import { env } from "process"

import { TypeUploadImageParam } from "@/lib/types/utils.type"
import { TypeReturnSererAction } from "@/lib/types/utils.type"

const bucket = env.NEXT_PUBLIC_IMAGE_BUCKET

export const createImage = async (
  imagePath: string,
  file: File
): Promise<TypeReturnSererAction> => {
  if (!bucket) return { message: "نام فهرست عکس یافت نشد", status: false }

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

  return { message: "اپلود عکس با مشکل مواجه شد", status: false }
}

const getImageUrl = (imagePath: string, bucket: string) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(imagePath)
  return { message: "عکس با موفقیت اپلود شد", status: true, data: publicUrl }
}

export const updateImage = async (imageUrl: string, file: File): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "نام فهرست عکس یافت نشد" }

  const imagePath = getImagePath(imageUrl)
  if (imagePath) {
    const { data } = await supabase.storage.from(bucket).update(imagePath, file)
    const updatedImageUrl = updateUrl(imageUrl)

    if (data)
      return { message: "بروزرسانی عکس با موفقیت انجام شد", status: true, data: updatedImageUrl }
  }

  return { message: "بروزرسانی عکس با مشکل مواجه شد", status: false }
}

export const deleteImage = async (imageUrl: string): Promise<TypeReturnSererAction> => {
  if (!bucket) return { status: false, message: "نام فهرست عکس یافت نشد" }

  const imagePath = getImagePath(imageUrl)
  if (imagePath) {
    const { data } = await supabase.storage.from(bucket).remove([imagePath])

    if (data) return { message: "عکس با موفقیت حذف شد", status: true }
  }

  return { message: "حذف عکس با مشکل مواجه شد", status: false }
}
