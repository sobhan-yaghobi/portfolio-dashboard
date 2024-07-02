"use client"

import React, { useState } from "react"

import Button from "@mui/material/Button"
import PasswordTextFiled from "@/components/modules/PasswordTextFiled"

const Password: React.FC = () => {
  const initialPassword = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
  ]
  const [passwords, setPasswords] = useState(initialPassword)

  const toggleVisibleAction = (id: number) => {
    setPasswords((prev) => {
      const newPasswords = prev.map((item) => {
        if (item.id === id) {
          return { ...item, visible: !item.visible }
        }
        return item
      })
      return newPasswords
    })
  }
  return (
    <form className="[&>section]:mt-6">
      {passwords?.map((pass) => pass.visible).includes(true) ? (
        <Button onClick={() => setPasswords(initialPassword)}>InVisible All</Button>
      ) : (
        <Button
          onClick={() => setPasswords((prev) => prev.map((item) => ({ ...item, visible: true })))}
        >
          Visible All
        </Button>
      )}
      <section className="grid grid-cols-2 gap-6">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <PasswordTextFiled
              {...passwords[index]}
              toggleVisible={toggleVisibleAction}
              key={index}
            />
          ))}
      </section>
      <section>
        <Button className="w-full" variant="contained" size="large">
          Save Changes
        </Button>
      </section>
    </form>
  )
}

export default Password
