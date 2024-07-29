"use client"

import React from "react"
import { Project } from "@prisma/client"
import { toast } from "react-toastify"

import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import Link from "next/link"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material"
import { deleteProjectFormAction } from "@/actions/project/deleteProject"

const ProjectBox: React.FC<Project> = ({ id, image, title, link, source, description }) => {
  const deleteAction = async () => {
    const deleteResult = await deleteProjectFormAction(id, "/projects")
    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }
  return (
    <Card className="w-80 relative">
      <IconButton
        onClick={deleteAction}
        title="delete"
        className="absolute right-1 top-1 bg-black/30"
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <CardMedia
        sx={{ height: 140 }}
        image="https://picsum.photos/id/870/200/300?grayscale&blur=2"
        title="project image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={link}>
          <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
            link
          </Button>
        </Link>
        <Link href={source}>
          <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
            source
          </Button>
        </Link>

        <Link href={`/dashboard/projects/${id}`}>
          <Button variant="outlined" size="small" endIcon={<EditIcon />}>
            edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default ProjectBox
