"use client"

import React from "react"
import { signIn } from "@/app/action/signIn"

import { useFormState, useFormStatus } from "react-dom"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import LoadingButton from "@mui/lab/LoadingButton"

const SignIn: React.FC = () => {
  const [state, action] = useFormState(signIn, null)
  return (
    <form
      className="bg-black/20 max-w-96 p-12 px-6 backdrop-blur-lg shadow-xl shadow-black/10 rounded-lg [&>*]:mt-3 [&]:first:*:!mt-0"
      action={action}
    >
      <Typography variant="h4" component="h2" className="mt-0">
        Sign In
      </Typography>
      <p>Welcome Back!</p>
      <section className="grid grid-cols-2 gap-3">
        <TextField
          error={Boolean(state?.errors && state.errors.pass1)}
          size="small"
          type="password"
          className="w-full"
          name="pass1"
          InputProps={{
            startAdornment: <InputAdornment position="start">1.</InputAdornment>,
          }}
          variant="outlined"
          helperText={state?.errors && state.errors.pass1}
        />

        <TextField
          error={Boolean(state?.errors && state.errors.pass2)}
          size="small"
          type="password"
          className="w-full"
          name="pass2"
          InputProps={{
            startAdornment: <InputAdornment position="start">2.</InputAdornment>,
          }}
          variant="outlined"
          helperText={state?.errors && state.errors.pass2}
        />

        <TextField
          error={Boolean(state?.errors && state.errors.pass3)}
          size="small"
          type="password"
          className="w-full"
          name="pass3"
          InputProps={{
            startAdornment: <InputAdornment position="start">3.</InputAdornment>,
          }}
          variant="outlined"
          helperText={state?.errors && state.errors.pass3}
        />

        <TextField
          error={Boolean(state?.errors && state.errors.pass4)}
          size="small"
          type="password"
          className="w-full"
          name="pass4"
          InputProps={{
            startAdornment: <InputAdornment position="start">4.</InputAdornment>,
          }}
          variant="outlined"
          helperText={state?.errors && state.errors.pass4}
        />
      </section>
      <section className="w-full">
        <SignInButton />
      </section>
    </form>
  )
}

const SignInButton = () => {
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
        Continue
      </LoadingButton>
    </>
  )
}

export default SignIn
