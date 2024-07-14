import React from "react"
import { TypeError } from "@/actions/definition"

import LowPriorityIcon from "@mui/icons-material/LowPriority"
import TitleIcon from "@mui/icons-material/Title"
import EditNoteIcon from "@mui/icons-material/EditNote"

import { InputAdornment, TextField, Typography } from "@mui/material"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"

type FormProps = {
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ submitText, submitFunction, errors }, ref) => {
    return (
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Order
          </Typography>
          <TextError message={errors && errors?.order}>
            <TextField
              error={Boolean(errors && errors?.order)}
              size="small"
              className="w-full"
              name="order"
              type="number"
              placeholder="write the order of technical"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LowPriorityIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Title
          </Typography>
          <TextError message={errors && errors?.title}>
            <TextField
              error={Boolean(errors && errors?.title)}
              size="small"
              className="w-full"
              name="title"
              placeholder="note a title"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Sub Title
          </Typography>
          <TextError message={errors && errors?.subtitle}>
            <TextField
              error={Boolean(errors && errors?.subtitle)}
              size="small"
              className="w-full"
              name="subtitle"
              placeholder="note a subtitle"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditNoteIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Description
          </Typography>
          <TextError message={errors && errors?.description}>
            <TextField
              error={Boolean(errors && errors?.description)}
              size="small"
              className="w-full"
              name="description"
              placeholder="note desc"
              multiline
              rows={4}
              variant="outlined"
            />
          </TextError>
        </section>

        <section className="w-full">
          <SubmitLoadingButton submitText={submitText} />
        </section>
      </form>
    )
  }
)

export default Form
