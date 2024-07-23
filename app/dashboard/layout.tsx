import React from "react"

import Sidebar from "@/components/modules/Sidebar"

const layout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  return (
    <div className="w-full flex flex-col relative lg:max-h-screen lg:h-screen lg:flex-row">
      {/* <div className="sticky top-0 z-50 lg:hidden">
    <Navbar />
  </div> */}
      <div className="hidden w-2/12 p-3 lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-3 rounded-sm overflow-y-auto lg:my-3">{children}</div>
      {/* <div className="w-3/12"></div> */}
    </div>
  )
}

export default layout
