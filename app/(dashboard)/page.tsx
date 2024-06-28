import AccountCircle from "@mui/icons-material/AccountCircle"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import HowToRegIcon from "@mui/icons-material/HowToReg"

import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Edit profile
      </Typography>
      <Link href={"/login"}>login</Link>
      <form className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Avatar
          </Typography>
          <div className="flex items-center gap-6">
            <div className="w-44 h-44 bg-white/50 rounded-full" />
            <div className="max-w-72 flex flex-col items-start gap-6">
              <Button variant="outlined" size="large">
                Upload new image
              </Button>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, exercitationem.
            </div>
          </div>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Name
          </Typography>
          <TextField
            size="small"
            className="w-full"
            id="name"
            placeholder="username or name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Phone
          </Typography>
          <TextField
            size="small"
            className="w-full"
            id="name"
            placeholder="+00 000 000 0000"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Email
          </Typography>
          <TextField
            size="small"
            className="w-full"
            id="name"
            placeholder="example@gmail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Location
          </Typography>
          <TextField
            size="small"
            className="w-full"
            id="name"
            placeholder="iran, tehran"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Bio
          </Typography>
          <TextField
            size="small"
            className="w-full"
            id="name"
            placeholder="iran, tehran"
            multiline
            rows={4}
            variant="outlined"
          />
        </section>

        <section>
          <Button className="w-full py-3" variant="contained" size="large">
            Save Changes
          </Button>
        </section>
      </form>
    </>
  )
}
