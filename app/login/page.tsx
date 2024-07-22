import React from "react"

import SignIn from "@/components/template/form/signIn"

const page: React.FC = () => {
  return (
    <div className="w-full h-dvh overflow-hidden">
      <div className="size-full fixed">
        <div className="size-[900px] absolute top-[-50%] right-[-10%] rounded-full">
          <div className="bg-gradient"></div>
        </div>
        <div className="size-[100px] blur-md rotate-90 absolute top-32 left-52 overflow-hidden rounded-full">
          <div className="bg-gradient"></div>
        </div>
      </div>

      <div className="size-full flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  )
}

export default page
