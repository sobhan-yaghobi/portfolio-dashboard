import { LoadingButton, LoadingButtonTypeMap } from "@mui/lab"
import React from "react"
import { useFormStatus } from "react-dom"

type SubmitLoadingButtonProps = {
  submitText: string
} & LoadingButtonTypeMap<{}, "button">["props"]

const SubmitLoadingButton: React.FC<SubmitLoadingButtonProps> = ({ submitText, ...props }) => {
  const { pending } = useFormStatus()
  return (
    <>
      <LoadingButton
        loading={pending}
        type="submit"
        className="w-full py-3"
        variant="contained"
        size="large"
        {...props}
      >
        {submitText}
      </LoadingButton>
    </>
  )
}

export default SubmitLoadingButton
