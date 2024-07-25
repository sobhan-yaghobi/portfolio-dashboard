"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { editProfile } from "@/actions/profile"

import { TypeError } from "@/lib/definition"
import { TypeAdminProfile } from "@/lib/types"

import AccountCircle from "@mui/icons-material/AccountCircle"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import TextError from "@/components/modules/TextError"

type ProfileProps = {
  id?: string
  defaultValues?: TypeAdminProfile | null
}

const Profile: React.FC<ProfileProps> = ({ id, defaultValues }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    if (id) {
      const actionResult = await editProfile(id, event)
      if (actionResult) {
        if ("errors" in actionResult) {
          return setErrors({ ...actionResult.errors } as TypeError)
        }

        const message = actionResult.message
        if (actionResult.status) {
          setErrors({} as TypeError)
          message && toast.success(message)
        } else {
          message && toast.error(message)
        }
        formRef.current?.reset()
      }
    }
  }

  return (
    <form action={clientAction} className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          آواتار
        </Typography>
        <div className="flex items-center gap-6">
          <div className="w-44 h-44 bg-white/50 rounded-full" />
          <div className="max-w-72 flex flex-col items-start gap-6">
            <TextError message={errors && errors.image}>
              <input id="image" name="image" type="file" accept="image/*" className="hidden" />
              <label
                htmlFor="image"
                className={`h-10 w-full p-4 flex items-center justify-center rounded-md border border-solid ${
                  errors && errors?.image ? "border-red-500" : "border-white"
                }`}
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

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          نام
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="name"
          placeholder="نام خود را وارد کنید"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          defaultValue={defaultValues?.name}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          تلفن
        </Typography>
        <TextField
          dir="ltr"
          size="small"
          className="w-full"
          name="phone"
          placeholder="+00 000 000 0000"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          defaultValue={defaultValues?.phone}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          ایمیل
        </Typography>
        <TextField
          dir="ltr"
          size="small"
          className="w-full"
          placeholder="example@gmail.com"
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          defaultValue={defaultValues?.email}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          موقعیت
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="location"
          placeholder="ایران ، تهران"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          defaultValue={defaultValues?.location}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          در باره ی خود
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="bio"
          placeholder="iran, tehran"
          multiline
          rows={4}
          variant="outlined"
          defaultValue={defaultValues?.bio}
        />
      </section>

      <section>
        <SubmitLoadingButton submitText="آپدیت" />
      </section>
    </form>
  )
}

export default Profile
