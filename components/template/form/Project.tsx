"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

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
  return (
    <form ref={formRef} action={clientAction} className="[&>section]:mt-6 [&>section>*]:mb-3">
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
        <p className="min-h-7 text-red-500 text-sm">{errors && errors.image}</p>
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
        />
        <p className="min-h-7 text-red-500 text-sm">{errors && errors.title}</p>
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
        />
        <p className="min-h-7 text-red-500 text-sm">{errors && errors.link}</p>
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
        />
        <p className="min-h-7 text-red-500 text-sm">{errors && errors.source}</p>
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Desc
        </Typography>
        <TextField
          size="small"
          className="w-full"
          name="description"
          placeholder="about project"
          multiline
          rows={4}
          variant="outlined"
          error={Boolean(errors && errors?.description)}
        />
        <p className="min-h-7 text-red-500 text-sm">{errors && errors.description}</p>
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
        className="w-full py-3"
        variant="contained"
        size="large"
      >
        Add Project
      </LoadingButton>
    </>
  )
}

export default Project
