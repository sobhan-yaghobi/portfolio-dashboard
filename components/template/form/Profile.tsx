import React from "react"
import { TypeAdminProfile } from "@/lib/types"

import AccountCircle from "@mui/icons-material/AccountCircle"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"

import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

type ProfileProps = {
  defaultValues?: TypeAdminProfile | null
}

const Profile: React.FC<ProfileProps> = ({ defaultValues }) => {
  return (
    <form className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          آواتار
        </Typography>
        <div className="flex items-center gap-6">
          <div className="w-44 h-44 bg-white/50 rounded-full" />
          <div className="max-w-72 flex flex-col items-start gap-6">
            <Button variant="outlined" size="large">
              عکس جدید آپلود کن
            </Button>
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
        <Button className="w-full py-3" variant="contained" size="large">
          آپدیت
        </Button>
      </section>
    </form>
  )
}

export default Profile
