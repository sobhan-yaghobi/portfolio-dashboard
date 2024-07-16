"use client"

import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7480ff" },
    secondary: { main: "#ff52d9" },
  },
  typography: {
    h1: { fontFamily: '"dana"' },
    h2: { fontFamily: '"dana"' },
    h3: { fontFamily: '"dana"' },
    h4: { fontFamily: '"dana"' },
    h5: { fontFamily: '"dana"' },
    h6: { fontFamily: '"dana"' },
    fontFamily: '"iran-sans", cursive',
  },
})

const MaterialProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MaterialProvider
