"use server"

import prisma from "@/lib/prisma"
import { createImage, updateImage } from "./image"
import { isEqual } from "lodash"

import {
  SchemaAdminProfile,
  TypeAdminProfileFrom,
  TypeErrors,
  TypeReturnSererAction,
} from "@/lib/definition"

import { AdminProfileInput } from "@/lib/types"

export const editProfileFormAction = async (
  adminId: string,
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const validationProfileResult = validateProfileForm(formData)

  if (validationProfileResult.success) return setProfile(adminId, validationProfileResult.data)

  return {
    errors: validationProfileResult.error.flatten().fieldErrors as TypeErrors,
    status: false,
  }
}

const validateProfileForm = (formData: FormData) =>
  SchemaAdminProfile.safeParse({
    image: formData.get("image"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    location: formData.get("location"),
    bio: formData.get("bio"),
  } as TypeAdminProfileFrom)

const setProfile = async (
  adminId: string,
  profileInfoForm: TypeAdminProfileFrom
): Promise<TypeReturnSererAction> => {
  const AdminImageStatus = await setAdminProfileImage(adminId, profileInfoForm.image)
  if (AdminImageStatus.status) {
    const isAdminInfoEqual = await newAdminInfoIsEqual(adminId, profileInfoForm)
    if (!isAdminInfoEqual)
      return updateAdmin(adminId, profileInfoForm, AdminImageStatus.data as string | undefined)

    return { message: "please update some filed", status: false }
  }

  return { message: AdminImageStatus.message, status: false }
}

const setAdminProfileImage = async (
  adminId: string,
  profileImageFile: TypeAdminProfileFrom["image"]
): Promise<TypeReturnSererAction> => {
  const databaseHasAdminImage = await hasAdminImageInDatabase(adminId)
  const profileFromHasImage = typeof profileImageFile !== "undefined" && profileImageFile.size

  if (!databaseHasAdminImage && !profileFromHasImage)
    return { message: "image is required", status: false }

  if (databaseHasAdminImage && profileFromHasImage)
    return await updateImage(adminId, profileImageFile)

  if (!databaseHasAdminImage && profileFromHasImage)
    return createAminImage(adminId, profileImageFile)

  return { status: true }
}

const hasAdminImageInDatabase = async (adminId: string) => {
  const isAdminHasImage = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { image: true },
  })
  return Boolean(isAdminHasImage?.image)
}

const createAminImage = async (
  adminId: string,
  profileImageFile: File
): Promise<TypeReturnSererAction> => {
  const createResult = await createImage(adminId, profileImageFile)
  if (createResult.path) {
    return { message: "image creation successfully", status: true, data: createResult.path }
  }
  return { message: "image creation failure", status: false }
}

const newAdminInfoIsEqual = async (adminId: string, profileInfoForm: TypeAdminProfileFrom) => {
  const adminInfo = await prisma.admin.findUnique({
    where: { id: adminId },
    select: AdminProfileInput,
  })
  if (adminInfo) {
    const { image: AdminInfoImage, ...adminInfoWithoutImage } = adminInfo
    const { image: formImage, ...profileInfoFormWithoutImage } = profileInfoForm

    return isEqual(adminInfoWithoutImage, profileInfoFormWithoutImage)
  }
  return false
}

const updateAdmin = async (
  adminId: string,
  profileInfoForm: TypeAdminProfileFrom,
  imageUrlPath: string | undefined
): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.admin.update({
    where: { id: adminId },
    data: { ...profileInfoForm, image: imageUrlPath },
  })

  if (updateResult) return { message: "profile updated successfully", status: true }

  return { message: "profile update got failure", status: false }
}
