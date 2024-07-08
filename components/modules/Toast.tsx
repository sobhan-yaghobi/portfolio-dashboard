import { Alert, AlertColor, IconButton, Snackbar } from "@mui/material"
import React from "react"

type ToastProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  duration: number
  message: string
  variant?: AlertColor
}

const Toast: React.FC<ToastProps> = ({ open, setOpen, duration, message, variant }) => {
  const close = () => setOpen(false)
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      autoHideDuration={duration}
      open={open}
      onClose={close}
    >
      <Alert onClose={close} severity={variant} sx={{ width: "100%" }} variant="standard">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
