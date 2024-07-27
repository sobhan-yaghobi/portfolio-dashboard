"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { SignInFormAction } from "@/actions/signIn"

import { TypeError, TypeReturnSererAction } from "@/lib/definition"

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

  const action = async (event: FormData) => {
    const actionResult = await SignInFormAction(event)

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showMessage(actionResult)
    resetForm()
  }

  const showMessage = (actionResult: TypeReturnSererAction) => {
    const { message } = actionResult
    if (actionResult.status) {
      message && toast.success(message)
    } else {
      message && toast.error(message)
    }
  }

  const resetForm = () => {
    setErrors({} as TypeError)
    formRef.current?.reset()
  }

  return (
    <form
      className="bg-black/20 max-w-96 p-6 backdrop-blur-lg shadow-xl shadow-black/10 rounded-lg absolute [&>*]:mt-1 [&]:first:*:!mt-0"
      ref={formRef}
      action={action}
    >
      <section className="mb-6">
        <Typography variant="h4" component="h2" className="mt-0">
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
            size="small"
            name="email"
            placeholder="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </TextError>
      </section>

      <section>
        <TextError className="min-h-5" message={errors && errors?.password}>
          <TextField
            autoComplete="off"
            dir="ltr"
            error={Boolean(errors && errors?.password)}
            size="small"
            type="password"
            name="password"
            placeholder="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </TextError>
      </section>

      <section className="w-full">
        <SubmitLoadingButton submitText="ادامه" variant="text" />
      </section>
    </form>
  )
}

export default SignIn
