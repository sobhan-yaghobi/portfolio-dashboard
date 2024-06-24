"use client"

import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
// import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

const theme = createTheme({
  palette: {
    primary: { main: "#7480ff" },
    secondary: { main: "#ff52d9" },
  },
})

const MaterialProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MaterialProvider
