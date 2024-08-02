import { Admin, Prisma } from "@prisma/client"
import {
  TypeAdminProfileFrom,
  TypeAdminProfileFromWithoutImage,
} from "../schema/adminProfile.schema"

// Profile Types
export type TypeAdminProfile = Omit<Prisma.AdminCreateInput, "password">

export const AdminProfileInput: Prisma.AdminSelect = {
  name: true,
  family: true,
  phone: true,
  email: true,
  location: true,
  bio: true,
  image: true,
}

// Form Actions
export type TypeEditProfileFormActionParam = {
  formData: FormData
  reValidPath: string
}

// Component Props
export type TypeProfileComponentProps = {
  defaultValues?: TypeAdminProfile | null
}

// Action Parameters
export type TypeSetProfileParams = {
  infoForm: TypeAdminProfileFrom
  reValidPath: string
}

export type TypeUpdateAdminParam = {
  admin: {
    id: string
    infoFormWithoutImage: TypeAdminProfileFromWithoutImage
    imageUrl?: string
  }
  reValidPath: string
}

// Password Input
export type TypePasswordAdminInput = Pick<Admin, "password" | "id">

export const PasswordAdminInput: Prisma.AdminSelect = {
  password: true,
  id: true,
}
