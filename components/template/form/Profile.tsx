"use client"

import React, { useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { editProfileFormAction } from "@/actions/profile"

import { TypeError } from "@/lib/types/utils.type"
import { TypeProfileComponentProps } from "@/lib/types/profile.type"

import AccountCircle from "@mui/icons-material/AccountCircle"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Person2TwoToneIcon from "@mui/icons-material/Person2TwoTone"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import TextError from "@/components/modules/TextError"
import Image from "next/image"

const Profile: React.FC<TypeProfileComponentProps> = ({ defaultValues }) => {
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const action = async (event: FormData) => {
    const actionResult = await editProfileFormAction({
      formData: event,
      reValidPath: "/dashboard",
    })

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => setErrors({} as TypeError)

  return (
    <form action={action} className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography component={"h5"} variant="subtitle1">
          آواتار
        </Typography>
        <div className="flex items-center gap-6">
          {defaultValues?.image ? (
            <Image
              className="size-44 rounded-full object-cover"
              height={300}
              width={300}
              src={defaultValues.image}
              alt="profile image"
            />
          ) : (
            <div className="bg-white/50 size-44 p-3 flex items-center justify-center rounded-full">
              <Person2TwoToneIcon className="!size-full" />
            </div>
          )}
          <div className="max-w-72 flex flex-col items-start gap-6">
            <TextError message={errors && errors.image}>
              <input accept="image/*" className="hidden" id="image" name="image" type="file" />
              <label
                className={`h-10 w-full p-4 flex items-center justify-center rounded-md border border-solid ${
                  errors && errors?.image ? "border-red-500" : "border-white"
                }`}
                htmlFor="image"
              >
                آپلود کن عکس جدید
              </label>
            </TextError>
            <p>
              پیشنهاد میشود مقدار حجم عکس زیر 5 مگابایت باشد و فرمت عکس JPG یا PNG باشد و همچنین
              فرمت GIF نامعتبر میباشد
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <section>
          <Typography component={"h5"} variant="subtitle1">
            نام
          </Typography>
          <TextError message={errors && errors.name}>
            <TextField
              className="w-full"
              defaultValue={defaultValues?.name}
              name="name"
              placeholder="نام خود را وارد کنید"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </TextError>
        </section>

        <section>
          <Typography component={"h5"} variant="subtitle1">
            نام خانوادگی
          </Typography>
          <TextError message={errors && errors.family}>
            <TextField
              className="w-full"
              defaultValue={defaultValues?.family}
              name="family"
              placeholder="نام خانوادگی خود را وارد کنید"
              size="small"
              variant="outlined"
            />
          </TextError>
        </section>
      </section>

      <section>
        <Typography component={"h5"} variant="subtitle1">
          تلفن
        </Typography>
        <TextError message={errors && errors.phone}>
          <TextField
            className="w-full"
            defaultValue={defaultValues?.phone}
            dir="ltr"
            name="phone"
            placeholder="+00 000 000 0000"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </TextError>
      </section>

      <section>
        <Typography component={"h5"} variant="subtitle1">
          ایمیل
        </Typography>
        <TextError message={errors && errors.email}>
          <TextField
            className="w-full"
            defaultValue={defaultValues?.email}
            dir="ltr"
            name="email"
            placeholder="example@gmail.com"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </TextError>
      </section>

      <section>
        <Typography component={"h5"} variant="subtitle1">
          موقعیت
        </Typography>
        <TextError message={errors && errors.location}>
          <TextField
            className="w-full"
            defaultValue={defaultValues?.location}
            name="location"
            placeholder="ایران ، تهران"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </TextError>
      </section>

      <section>
        <Typography component={"h5"} variant="subtitle1">
          در باره ی خود
        </Typography>
        <TextError message={errors && errors.bio}>
          <TextField
            className="w-full"
            defaultValue={defaultValues?.bio}
            multiline
            name="bio"
            placeholder="iran, tehran"
            rows={4}
            size="small"
            variant="outlined"
          />
        </TextError>
      </section>

      <section>
        <SubmitLoadingButton submitText="آپدیت" />
      </section>
    </form>
  )
}

export default Profile
