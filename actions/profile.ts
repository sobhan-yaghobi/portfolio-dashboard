"use server"

import {
  SchemaAdminProfile,
  TypeAdminProfileFrom,
  TypeErrors,
  TypeReturnSererAction,
} from "@/lib/definition"
import prisma from "@/lib/prisma"
import { AdminProfileInput } from "@/lib/types"
import { isEqual } from "lodash"
import { updateImage } from "./image"

const profileObject = (formData: FormData) =>
  ({
    // image: formData.get("image") as File,
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    location: formData.get("location"),
    bio: formData.get("bio"),
  } as TypeAdminProfileFrom)

export const editProfile = async (
  id: string,
  formData: FormData
): Promise<TypeReturnSererAction> => {
  const validationResult = SchemaAdminProfile.safeParse(profileObject(formData))

  if (validationResult.success) {
    const profileResult = await prisma.admin.findUnique({
      where: { id },
      select: AdminProfileInput,
    })

    if (profileResult) {
      if (!isEqual(profileResult, validationResult.data)) {
        // const updateImageResult = await updateImage(
        //   profileResult.image,
        //   validationResult.data.image
        // )

        if (true) {
          const { ...profileWithoutImage } = validationResult.data

          const updateResult = await prisma.admin.update({
            where: { id },
            data: { ...profileWithoutImage },
          })

          if (updateResult) {
            return { message: "admin profile update successfully", status: true }
          }
        }
        return { message: "update is got failure", status: false }
      }
      return { message: "please update the admin profile field first !", status: false }
    }
    return { message: "admin profile not found", status: false }
  }

  return { errors: validationResult.error.flatten().fieldErrors as TypeErrors, status: false }
}
