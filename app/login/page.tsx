import React from "react"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"

const page: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen fixed">
        <div className="size-[900px] absolute top-[-50%] right-[-10%] rounded-full">
          <div className="bg-gradient"></div>
        </div>
        <div className="size-[100px] blur-md rotate-90 absolute top-32 left-52 overflow-hidden rounded-full">
          <div className="bg-gradient"></div>
        </div>
      </div>

      <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
        <form
          className="bg-black/20 max-w-96 p-12 backdrop-blur-lg shadow-xl shadow-black/10 rounded-lg [&>*]:mt-3 [&]:first:*:!mt-0"
          action=""
        >
          <Typography variant="h4" component="h2">
            Sign In
          </Typography>
          <p>Welcome Back!</p>
          <section className="grid grid-cols-2 gap-3">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <TextField
                  key={index}
                  size="small"
                  type="password"
                  className="w-full"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{index + 1}.</InputAdornment>,
                  }}
                  variant="outlined"
                />
              ))}
          </section>
          <section className="w-full">
            <Button className="w-full" variant="outlined" size="large">
              Continue
            </Button>
          </section>
        </form>
      </div>
    </>
  )
}

export default page
