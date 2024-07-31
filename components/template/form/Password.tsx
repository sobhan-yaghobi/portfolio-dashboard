"use client"

import React, { useRef, useState } from "react"
import { toast } from "react-toastify"

import { TypeError, TypeReturnSererAction } from "@/lib/definition"

import { changePasswordFormAction } from "@/actions/password"

import PasswordTextFiled from "@/components/modules/PasswordTextFiled"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import TextError from "@/components/modules/TextError"
import { showActionReturnMessage } from "@/lib/utils"

const Password: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await changePasswordFormAction(event)

    if (actionResult) {
      if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

      showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
    }
  }

  const resetForm = () => {
    setErrors({} as TypeError)
    formRef.current?.reset()
  }
  return (
    <form ref={formRef} action={clientAction} className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <TextError message={errors && errors.currentPassword}>
          <PasswordTextFiled name="currentPassword" label="گذرواژه فعلی" />
        </TextError>
      </section>
      <section>
        <TextError message={errors && errors.newPassword}>
          <PasswordTextFiled name="newPassword" label="گذرواژه جدید" />
        </TextError>
      </section>
      <section>
        <SubmitLoadingButton submitText="تغییر گذرواژه" />
      </section>
    </form>
  )
}

export default Password
