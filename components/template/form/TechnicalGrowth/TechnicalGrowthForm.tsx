import React from "react"
import { TypeError } from "@/actions/definition"
import { TypeTechnicalGrowth } from "@/lib/types"

import TitleIcon from "@mui/icons-material/Title"
import EditNoteIcon from "@mui/icons-material/EditNote"

import { InputAdornment, TextField, Typography } from "@mui/material"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"

type TechnicalGrowthFormProps = {
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
  defaultValues?: TypeTechnicalGrowth | null
}

const TechnicalGrowthForm = React.forwardRef<HTMLFormElement, TechnicalGrowthFormProps>(
  ({ submitText, submitFunction, errors, defaultValues }, ref) => {
    return (
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
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
              defaultValue={defaultValues?.title}
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
              defaultValue={defaultValues?.subtitle}
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
              defaultValue={defaultValues?.description}
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

TechnicalGrowthForm.displayName = "TechnicalGrowthForm"

export default TechnicalGrowthForm
