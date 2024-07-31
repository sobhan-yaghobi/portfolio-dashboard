import React from "react"

import { TechnicalGrowthFormComponentProps } from "@/lib/types"

import TitleIcon from "@mui/icons-material/Title"
import EditNoteIcon from "@mui/icons-material/EditNote"

import { InputAdornment, TextField, Typography } from "@mui/material"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"

const TechnicalGrowthForm = React.forwardRef<HTMLFormElement, TechnicalGrowthFormComponentProps>(
  ({ submitText, submitFunction, errors, defaultValues }, ref) => {
    return (
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            عنوان
          </Typography>
          <TextError message={errors && errors?.title}>
            <TextField
              className="w-full"
              defaultValue={defaultValues?.title}
              error={Boolean(errors && errors?.title)}
              name="title"
              placeholder="عنوان رشد فنی خود را بنویسید"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            زیرعنوان
          </Typography>
          <TextError message={errors && errors?.subtitle}>
            <TextField
              className="w-full"
              defaultValue={defaultValues?.subtitle}
              error={Boolean(errors && errors?.subtitle)}
              name="subtitle"
              placeholder="زیر عنوانی برای رشد فنی خود بنویسید"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditNoteIcon />
                  </InputAdornment>
                ),
              }}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            متن توضیح رشد فنی
          </Typography>
          <TextError message={errors && errors?.description}>
            <TextField
              className="w-full"
              defaultValue={defaultValues?.description}
              error={Boolean(errors && errors?.description)}
              name="description"
              multiline
              placeholder="توضیحی برای رشد فنی خود بنویسید"
              rows={4}
              size="small"
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

TechnicalGrowthForm.displayName = "TechnicalGrowthForm"

export default TechnicalGrowthForm
