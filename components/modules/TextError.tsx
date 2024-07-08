import React from "react"

type TextErrorProps = {
  message?: string | string[]
}

const TextError: React.FC<React.PropsWithChildren<TextErrorProps>> = ({ children, message }) => {
  return (
    <>
      {children}
      <p className="min-h-7 text-red-500 text-sm">
        {typeof message === "string" ? message : message?.at(-1)}
      </p>
    </>
  )
}

export default TextError
