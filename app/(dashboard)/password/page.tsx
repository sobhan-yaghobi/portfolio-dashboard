import React from "react"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Button from "@mui/material/Button"

const page = () => {
  return (
    <>
      <Typography variant="h4" component="h2" className="mb-8">
        Password
      </Typography>
      <form className="[&>section]:mt-6">
        <section className="grid grid-cols-2 gap-6">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <TextField
                key={index}
                size="small"
                className="w-full"
                id="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{`${index + 1}.`}</InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            ))}
        </section>
        <section>
          <Button className="w-full" variant="contained" size="large">
            Save Changes
          </Button>
        </section>
      </form>
    </>
  )
}

export default page
