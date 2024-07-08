"use client"

import React, { useRef, useState } from "react"
import { addProject } from "@/actions/project"

import { TypeError } from "@/actions/definition"

import { useFormStatus } from "react-dom"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import { LoadingButton } from "@mui/lab"

const Project: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await addProject(event)
    if (actionResult) {
      if (!actionResult.status) {
        formRef.current?.reset()
      }

      if ("errors" in actionResult) {
        setErrors({ ...actionResult.errors } as TypeError)
      }
    }
  }
  return (
    <form action={clientAction} className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Image
        </Typography>
        <input
          name="image"
          type="file"
          className={`w-full p-4 rounded-md border border-solid ${
            errors && errors?.image ? "border-red-500" : "border-white"
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
          error={Boolean(errors && errors?.title)}
          helperText={errors && errors?.title}
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
          error={Boolean(errors && errors?.link)}
          helperText={errors && errors?.link}
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
          error={Boolean(errors && errors?.source)}
          helperText={errors && errors?.source}
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
          error={Boolean(errors && errors?.description)}
          helperText={errors && errors?.description}
        />
      </section>

      <section>
        <SignInButton />
      </section>
    </form>
  )
}

const SignInButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <>
      <LoadingButton
        loading={pending}
        type="submit"
        className="w-full"
        variant="outlined"
        size="large"
      >
        Add Project
      </LoadingButton>
    </>
  )
}

export default Project
