"use client"

import React, { useState } from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

export type PasswordTextFiledProps = {
  id: number
  visible: boolean
  toggleVisible: (id: PasswordTextFiledProps["id"]) => void
  password?: string
}

const PasswordTextFiled: React.FC<PasswordTextFiledProps> = ({
  id,
  visible,
  toggleVisible,
  password,
}) => {
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{`${id}.`}</InputLabel>
      <OutlinedInput
        autoComplete="off"
        label={`${id}.`}
        id="outlined-adornment-password"
        type={visible ? "text" : "password"}
        defaultValue={password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => toggleVisible(id)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordTextFiled
