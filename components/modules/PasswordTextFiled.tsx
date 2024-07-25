"use client"

import React, { useState } from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

export type PasswordTextFiledProps = {
  name: string
  label: string
  password?: string
}

const PasswordTextFiled: React.FC<PasswordTextFiledProps> = ({ name, label, password }) => {
  const [toggleVisible, setToggleVisible] = useState(false)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <FormControl variant="outlined" className="w-full">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        autoComplete="off"
        name={name}
        label={label}
        id="outlined-adornment-password"
        type={toggleVisible ? "text" : "password"}
        defaultValue={password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setToggleVisible((prev) => !prev)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {toggleVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordTextFiled
