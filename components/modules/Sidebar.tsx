"use client"

import React from "react"

import Person4Icon from "@mui/icons-material/Person4"
import KeyIcon from "@mui/icons-material/Key"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import LogoutIcon from "@mui/icons-material/Logout"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const items = [
  { id: 1, href: "/", text: "Edit profile", icon: <Person4Icon /> },
  { id: 2, href: "/password", text: "Password", icon: <KeyIcon /> },
  { id: 3, href: "/notify", text: "Notifications", icon: <NotificationsIcon /> },
  { id: 4, href: "/skills", text: "Skills", icon: <AssignmentIndIcon /> },
  { id: 5, href: "/projects", text: "Projects", icon: <FolderOpenIcon /> },
  { id: 6, href: "/blogs", text: "Blogs", icon: <NewspaperIcon /> },
]

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  return (
    <Box>
      <List component="nav" aria-label="main mailbox folders">
        {items.map((item) => (
          <Link key={item.id} href={item.href}>
            <ListItemButton selected={pathname === item.href} key={item.id} className="rounded-lg">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton color="error" className="rounded-lg">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  )
}

export default Sidebar
