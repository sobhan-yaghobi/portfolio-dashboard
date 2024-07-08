import { cn } from "@/lib/utils"
import React from "react"

type TextErrorProps = {
  message?: string | string[]
  className?: string
}

const TextError: React.FC<React.PropsWithChildren<TextErrorProps>> = ({
  children,
  message,
  className,
}) => {
  return (
    <div>
      {children}
      <p className={cn("min-h-7 text-red-500 text-sm", className)}>
        {typeof message === "string" ? message : message?.at(-1)}
      </p>
    </div>
  )
}

export default TextError
