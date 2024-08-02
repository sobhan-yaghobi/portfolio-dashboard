"use server"

import prisma from "@/lib/prisma"
import { createImage, updateImage } from "./image"
import { isEqual } from "lodash"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { SchemaAdminProfile, TypeAdminProfileFrom } from "@/lib/schema/adminProfile.schema"
import { TypeErrors, TypeReturnSererAction } from "@/lib/types/utils.type"
import {
  AdminProfileInput,
  TypeAdminProfile,
  TypeEditProfileFormActionParam,
  TypeSetProfileParams,
  TypeUpdateAdminParam,
} from "@/lib/types/profile.type"
import { getAdminId } from "@/lib/utils"

export const editProfileFormAction = async ({
  formData,
  reValidPath,
}: TypeEditProfileFormActionParam): Promise<TypeReturnSererAction> => {
  const validateResult = validateProfileForm(formData)

  if (validateResult.success)
    return setProfile({
      infoForm: validateResult.data,
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
  infoForm,
  reValidPath,
}: TypeSetProfileParams): Promise<TypeReturnSererAction> => {
  const token = cookies().get("session")?.value
  const adminId = await getAdminId(token)
  const getAdminInfo = await fetchAdminProfileInput(adminId)
  if (!getAdminInfo || !adminId) return { status: false, message: "ادمین یافت نشد" }

  const { image: adminInfoImage, ...adminInfoWithoutImage } = getAdminInfo
  const { image: adminImageForm, ...profileInfoFormWithoutImage } = infoForm

  const isImageFormExist = Boolean(adminImageForm?.size)

  const adminImageResult = await setAdminProfileImage(adminId, adminImageForm)
  if (!adminImageResult.status) return { status: false, message: adminImageResult.message }

  const isAdminInfoEqual = await newAdminInfoIsEqual(
    adminInfoWithoutImage,
    profileInfoFormWithoutImage
  )

  if (!isImageFormExist && isAdminInfoEqual)
    return { message: "لطفا فرم را بروزرسانی کنید", status: false }

  return updateAdmin({
    admin: {
      id: adminId,
      infoFormWithoutImage: profileInfoFormWithoutImage,
      imageUrl: adminImageResult.data as string,
    },
    reValidPath,
  })
}

const fetchAdminProfileInput = async (
  adminId: string | undefined
): Promise<TypeAdminProfile | null> =>
  await prisma.admin.findUnique({ where: { id: adminId }, select: AdminProfileInput })

const setAdminProfileImage = async (
  adminId: string,
  profileImageFile: TypeAdminProfileFrom["image"]
): Promise<TypeReturnSererAction> => {
  const adminImageInDatabaseResult = await getAdminImageInDatabase(adminId)
  const profileFormHasImage = profileImageFile && profileImageFile.size

  if (!adminImageInDatabaseResult && !profileFormHasImage) {
    return imageIsRequired()
  }

  if (adminImageInDatabaseResult && profileFormHasImage) {
    return await updateAdminImage(adminImageInDatabaseResult, profileImageFile)
  }

  if (!adminImageInDatabaseResult && profileFormHasImage) {
    return await createAdminImage(adminId, profileImageFile)
  }

  return { status: true }
}

const getAdminImageInDatabase = async (adminId: string) => {
  const isAdminHasImage = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { image: true },
  })
  return isAdminHasImage?.image
}

const imageIsRequired = () => ({ message: "عکس اجباری میباشد", status: false })

const updateAdminImage = async (adminId: string, profileImageFile: File) =>
  await updateImage(adminId, profileImageFile)

const createAdminImage = async (
  adminId: string,
  profileImageFile: File
): Promise<TypeReturnSererAction> => {
  const createResult = await createImage(adminId, profileImageFile)
  if (createResult.status)
    return { message: createResult.message, status: true, data: createResult.data }

  return { message: createResult.message, status: false }
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
    data: { ...admin.infoFormWithoutImage, image: admin.imageUrl },
  })

  if (updateResult) {
    revalidatePath(reValidPath)
    return { message: "پروفایل با موفقیت بروزرسانی شد", status: true }
  }

  return { message: "بروزرسانی پروفایل با مشکل مواجه شد", status: false }
}
