"use client"

import React from "react"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"

const Project: React.FC = () => {
  return (
    <form className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Image
        </Typography>
        <input
          type="file"
          className="w-full p-4 rounded-md border border-solid border-white"
          id="logoFile"
          name="image"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Title
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="like next js dashboard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Project Link
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="https://project.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Source Link
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="https://source.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Desc
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="about project"
          multiline
          rows={4}
          variant="outlined"
        />
      </section>

      <section>
        <Button className="w-full" variant="contained" size="large">
          Add Skill
        </Button>
      </section>
    </form>
  )
}

export default Project
