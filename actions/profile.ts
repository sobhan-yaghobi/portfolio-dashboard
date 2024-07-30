"use server"

import prisma from "@/lib/prisma"
import { createImage, updateImage } from "./image"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"

import {
  SchemaAdminProfile,
  TypeAdminProfileFrom,
  TypeErrors,
  TypeReturnSererAction,
} from "@/lib/definition"
import {
  AdminProfileInput,
  TypeAdminProfile,
  TypeEditProfileFormActionParam,
  TypeSetProfileParam,
  TypeUpdateAdminParam,
} from "@/lib/types"

export const editProfileFormAction = async ({
  admin,
  reValidPath,
}: TypeEditProfileFormActionParam): Promise<TypeReturnSererAction> => {
  const validateResult = validateProfileForm(admin.formData)

  if (validateResult.success)
    return setProfile({
      admin: {
        id: admin.id,
        InfoForm: validateResult.data,
      },
      reValidPath,
    })

  return {
    errors: validateResult.error.flatten().fieldErrors as TypeErrors,
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

const setProfile = async ({
  admin,
  reValidPath,
}: TypeSetProfileParam): Promise<TypeReturnSererAction> => {
  const getAdminInfo = await fetchAdminProfileInput(admin.id)
  if (!getAdminInfo) return { status: false, message: "Admin not found" }

  const { image: adminInfoImage, ...adminInfoWithoutImage } = getAdminInfo
  const { image: adminImageForm, ...profileInfoFormWithoutImage } = admin.InfoForm

  const isImageFormExist = Boolean(adminImageForm?.size)

  const adminImageResult = await setAdminProfileImage(admin.id, adminImageForm)
  if (!adminImageResult.status) return { status: false, message: adminImageResult.message }

  const isAdminInfoEqual = await newAdminInfoIsEqual(
    adminInfoWithoutImage,
    profileInfoFormWithoutImage
  )

  if (!isImageFormExist && isAdminInfoEqual)
    return { message: "Please update filed first", status: false }

  return updateAdmin({
    admin: { id: admin.id, infoFormWithoutImage: profileInfoFormWithoutImage },
    reValidPath,
  })
}

const fetchAdminProfileInput = async (adminId: string): Promise<TypeAdminProfile | null> =>
  await prisma.admin.findUnique({ where: { id: adminId }, select: AdminProfileInput })

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
  if (createResult.status) {
    return { message: "Image created successfully", status: true, data: createResult.data }
  }
  return { message: "Image creation failed", status: false }
}

const newAdminInfoIsEqual = async (
  currentAdminInfo: TypeAdminProfile,
  newAdminInfo: TypeAdminProfile
) => isEqual(currentAdminInfo, newAdminInfo)

const updateAdmin = async ({
  admin,
  reValidPath,
}: TypeUpdateAdminParam): Promise<TypeReturnSererAction> => {
  const updateResult = await prisma.admin.update({
    where: { id: admin.id },
    data: { ...admin.infoFormWithoutImage },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "Profile updated successfully", status: true }
  }

  return { message: "Profile update failed", status: false }
}
