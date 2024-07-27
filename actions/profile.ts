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
  const validateProfileResult = validateProfileForm(formData)

  if (validateProfileResult.success) return setProfile(adminId, validateProfileResult.data)

  return {
    errors: validateProfileResult.error.flatten().fieldErrors as TypeErrors,
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
  const adminImageStatus = await setAdminProfileImage(adminId, profileInfoForm.image)
  if (adminImageStatus.status) {
    const isAdminInfoEqual = await newAdminInfoIsEqual(adminId, profileInfoForm)
    if (!isAdminInfoEqual)
      return updateAdmin(adminId, profileInfoForm, adminImageStatus.data as string | undefined)

    return { message: "Please update some fields", status: false }
  }

  return { message: adminImageStatus.message, status: false }
}

const setAdminProfileImage = async (
  adminId: string,
  profileImageFile: TypeAdminProfileFrom["image"]
): Promise<TypeReturnSererAction> => {
  const databaseHasAdminImage = await hasAdminImageInDatabase(adminId)
  const profileFormHasImage = profileImageFile && profileImageFile.size

  if (!databaseHasAdminImage && !profileFormHasImage) {
    return imageIsRequired()
  }

  if (databaseHasAdminImage && profileFormHasImage) {
    return await updateAdminImage(adminId, profileImageFile)
  }

  if (!databaseHasAdminImage && profileFormHasImage) {
    return await createAdminImage(adminId, profileImageFile)
  }

  return { status: true }
}

const hasAdminImageInDatabase = async (adminId: string) => {
  const isAdminHasImage = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { image: true },
  })
  return Boolean(isAdminHasImage?.image)
}

const imageIsRequired = () => ({ message: "Image is required", status: false })

const updateAdminImage = async (adminId: string, profileImageFile: File) =>
  await updateImage(adminId, profileImageFile)

const createAdminImage = async (
  adminId: string,
  profileImageFile: File
): Promise<TypeReturnSererAction> => {
  const createResult = await createImage(adminId, profileImageFile)
  if (createResult.path) {
    return { message: "Image created successfully", status: true, data: createResult.path }
  }
  return { message: "Image creation failed", status: false }
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

  if (updateResult) return { message: "Profile updated successfully", status: true }

  return { message: "Profile update failed", status: false }
}
