import React from "react"
import { cn } from "@/lib/utils"

import { Typography } from "@mui/material"
import Image from "next/image"

type EmptyBoxProps = {
  message: string
  className?: string
}

const EmptyBox: React.FC<EmptyBoxProps> = ({ message, className }) => {
  return (
    <div
      className={cn(
        "w-full h-full max-h-screen flex flex-col gap-3 items-center justify-center opacity-70 select-none",
        className
      )}
    >
      <Image width={200} height={200} src={"/empty-folder.png"} alt="empty box" draggable={false} />
      <Typography variant="h6" component="h6" className="relative">
        {message}
      </Typography>
    </div>
  )
}

export default EmptyBox
