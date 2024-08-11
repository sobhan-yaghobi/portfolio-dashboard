"use client"

import React from "react"

import { TypeSoftSkillFormComponentProps } from "@/lib/types/softSkill.type"

import TitleIcon from "@mui/icons-material/Title"

import TextError from "@/components/modules/TextError"
import { InputAdornment, Rating, TextField, Typography } from "@mui/material"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"

const SoftSkillForm = React.forwardRef<HTMLFormElement, TypeSoftSkillFormComponentProps>(
  ({ defaultValues, submitText, submitFunction, errors }, ref) => {
    const [score, setScore] = React.useState<number | null>(1)

    return (
      <form action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3" ref={ref}>
        <section className="grid grid-cols-2 gap-3">
          <section>
            <Typography variant="subtitle1" component={"h5"}>
              نام مهارت
            </Typography>
            <TextError message={errors && errors?.name}>
              <TextField
                className="w-full"
                defaultValue={defaultValues && defaultValues.name}
                error={Boolean(errors && errors?.name)}
                name="name"
                placeholder="مانند انعطاف پذیری"
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
            <Typography component={"h5"} variant="subtitle1">
              میزان مهارت
            </Typography>
            <TextError message={errors && errors?.score}>
              <Rating
                size="large"
                className="h-10 flex items-center"
                name="score"
                value={score}
                onChange={(_, newScore) => {
                  setScore(newScore)
                }}
              />
            </TextError>
          </section>
        </section>

        <section>
          <SubmitLoadingButton submitText={submitText} />
        </section>
      </form>
    )
  }
)

export default SoftSkillForm
