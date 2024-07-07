"use client"

import React from "react"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import { useFormState } from "react-dom"
import { addProject } from "@/actions/project"

const Project: React.FC = () => {
  const [state, action] = useFormState(addProject, null)
  return (
    <form action={action} className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Image
        </Typography>
        <input
          name="image"
          type="file"
          className={`w-full p-4 rounded-md border border-solid ${
            state?.errors?.image ? "border-red-500" : "border-white"
          }`}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Title
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="title"
          placeholder="like next js dashboard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          error={Boolean(state?.errors?.title)}
          helperText={state?.errors?.title}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Project Link
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="link"
          placeholder="https://project.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          error={Boolean(state?.errors?.link)}
          helperText={state?.errors?.link}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Source Link
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="source"
          placeholder="https://source.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          error={Boolean(state?.errors?.source)}
          helperText={state?.errors?.source}
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Desc
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="description"
          placeholder="about project"
          multiline
          rows={4}
          variant="outlined"
          error={Boolean(state?.errors?.description)}
          helperText={state?.errors?.description}
        />
      </section>

      <section>
        <Button type="submit" className="w-full" variant="contained" size="large">
          Add Project
        </Button>
      </section>
    </form>
  )
}

export default Project
