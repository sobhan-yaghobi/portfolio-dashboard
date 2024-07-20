"use client"

import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"
import createCache from "@emotion/cache"

const theme = createTheme({
  direction: "rtl",
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

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
})

const MaterialProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MaterialProvider
