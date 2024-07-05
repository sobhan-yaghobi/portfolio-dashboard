"use client"

import React, { Fragment } from "react"
import { usePathname } from "next/navigation"

import Person4Icon from "@mui/icons-material/Person4"
import KeyIcon from "@mui/icons-material/Key"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import PostAddIcon from "@mui/icons-material/PostAdd"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import FolderCopyIcon from "@mui/icons-material/FolderCopy"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import LogoutIcon from "@mui/icons-material/Logout"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Collapse from "@mui/material/Collapse"
import Link from "next/link"
import { logout } from "@/app/action/signIn"

type TypeSidebarItem = {
  id: number
  href: string
  title: string
  icon: React.ReactNode
  children?: TypeSidebarItem[]
}
const items: TypeSidebarItem[] = [
  { id: 1, href: "/", title: "Edit profile", icon: <Person4Icon /> },
  { id: 2, href: "/password", title: "Password", icon: <KeyIcon /> },
  { id: 3, href: "/notify", title: "Notifications", icon: <NotificationsIcon /> },
  {
    id: 4,
    title: "Skills",
    href: "skills",
    icon: <AssignmentIndIcon />,
    children: [
      { id: 41, href: "/skills/add", title: "Add", icon: <PostAddIcon /> },
      { id: 42, href: "/skills", title: "List", icon: <RecentActorsIcon /> },
    ],
  },
  {
    id: 5,
    title: "Projects",
    href: "/projects",
    icon: <FolderOpenIcon />,
    children: [
      { id: 51, href: "/projects/add", title: "Add", icon: <CreateNewFolderIcon /> },
      { id: 52, href: "/projects", title: "List", icon: <FolderCopyIcon /> },
    ],
  },
  { id: 6, href: "/blogs", title: "Blogs", icon: <NewspaperIcon /> },
]

type ItemLinkProps = Omit<TypeSidebarItem, "children"> & {
  pathname: string
}
const ItemLink: React.FC<ItemLinkProps> = ({ ...item }) => {
  return (
    <Link href={item.href}>
      <ListItemButton selected={item.pathname === item.href} className="rounded-lg">
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </Link>
  )
}

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const [open, setOpen] = React.useState("")
  const clickAction = (path: string) => {
    setOpen((prevPath) => (prevPath === path ? "" : path))
  }
  const logoutAction = () => logout()
  return (
    <Box>
      <List component="nav" aria-label="main mailbox folders">
        {items.map((item) => (
          <Fragment key={item.id}>
            {typeof item.children === "undefined" ? (
              <ItemLink {...item} pathname={pathname} />
            ) : (
              <>
                <ListItemButton onClick={() => clickAction(item.href)} className="rounded-lg">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {open === item.href ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse className="ml-3" in={open === item.href} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((subitem) => (
                      <ItemLink key={subitem.id} {...subitem} pathname={pathname} />
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Fragment>
        ))}
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton onClick={logoutAction} color="error" className="rounded-lg">
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
