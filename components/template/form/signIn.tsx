"use client"

import React, { useRef, useState } from "react"
import { showActionReturnMessage } from "@/lib/utils"

import { TypeError } from "@/lib/types/utils.type"

import { signInFormAction } from "@/actions/signIn"

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import KeyIcon from "@mui/icons-material/Key"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"

const SignIn: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await signInFormAction(event, "/dashboard")

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
    resetForm()
  }

  const resetForm = () => {
    formRef.current?.reset()
    setErrors({} as TypeError)
  }

  return (
    <form
      className="bg-black/20 max-w-96 p-6 backdrop-blur-lg shadow-xl shadow-black/10 rounded-lg absolute [&>*]:mt-1 [&]:first:*:!mt-0"
      ref={formRef}
      action={clientAction}
    >
      <section className="mb-6">
        <Typography component="h2" className="mt-0" variant="h4">
          ورود
        </Typography>
        <p>خوش برگشتید!</p>
      </section>

      <section>
        <TextError className="min-h-5" message={errors && errors?.email}>
          <TextField
            autoComplete="off"
            dir="ltr"
            error={Boolean(errors && errors?.email)}
            placeholder="email"
            name="email"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </TextError>
      </section>

      <section>
        <TextError className="min-h-5" message={errors && errors?.password}>
          <TextField
            autoComplete="off"
            dir="ltr"
            error={Boolean(errors && errors?.password)}
            placeholder="password"
            name="password"
            size="small"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
        </TextError>
      </section>

      <section>
        <SubmitLoadingButton submitText="ادامه" variant="text" />
      </section>
    </form>
  )
}

export default SignIn
