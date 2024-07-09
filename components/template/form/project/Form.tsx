"use client"

import React from "react"

import { TypeError } from "@/actions/definition"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import { TypeProjectInput } from "@/lib/types"

type FormProps = {
  defaultValues?: TypeProjectInput | null
  submitText: string
  errors: TypeError
  submitFunction: (formData: FormData) => void | any
}
const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ defaultValues, submitText, submitFunction, errors }, ref) => {
    return (
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Image
          </Typography>
          <TextError message={errors && errors.image}>
            <input
              name="image"
              type="file"
              className={`w-full p-4 rounded-md border border-solid ${
                errors && errors?.image ? "border-red-500" : "border-white"
              }`}
            />
            {defaultValues && defaultValues.image && <span>Default : {defaultValues.image}</span>}
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Title
          </Typography>
          <TextError message={errors && errors.title}>
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
              defaultValue={defaultValues && defaultValues.title}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Project Link
          </Typography>
          <TextError message={errors && errors.link}>
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
              defaultValue={defaultValues && defaultValues.link}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Source Link
          </Typography>
          <TextError message={errors && errors.source}>
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
              defaultValue={defaultValues && defaultValues.source}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Desc
          </Typography>
          <TextError message={errors && errors.description}>
            <TextField
              size="small"
              className="w-full"
              name="description"
              placeholder="about project"
              multiline
              rows={4}
              variant="outlined"
              error={Boolean(errors && errors?.description)}
              defaultValue={defaultValues && defaultValues.description}
            />
          </TextError>
        </section>

        <section>
          <SubmitLoadingButton submitText={submitText} variant="contained" />
        </section>
      </form>
    )
  }
)
export default Form
