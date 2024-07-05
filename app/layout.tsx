import type { Metadata } from "next"

import "./globals.css"
import MaterialProvider from "@/components/MaterialProvider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MaterialProvider>{children}</MaterialProvider>
      </body>
    </html>
  )
}
