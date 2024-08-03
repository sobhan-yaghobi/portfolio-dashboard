"use client"

import React from "react"
import { Project } from "@prisma/client"
import { toast } from "react-toastify"

import { deleteProjectFormAction } from "@/actions/project/deleteProject"

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
import Image from "next/image"

const ProjectBox: React.FC<Project> = ({ id, image, title, link, source, description }) => {
  const deleteAction = async () => {
    const deleteResult = await deleteProjectFormAction(id, "/projectList")

    if (deleteResult.status) return toast.success(deleteResult.message)

    return toast.error(deleteResult.message)
  }

  return (
    <Card className="size-full flex flex-col justify-between relative">
      <IconButton
        onClick={deleteAction}
        title="delete"
        className="!bg-black/30 !absolute right-1 top-1"
        color="error"
      >
        <DeleteIcon />
      </IconButton>

      <CardMedia className="bg-gray-400/50 h-52 !flex !justify-center">
        <Image height={400} width={300} className="h-full w-auto" src={image} alt="project image" />
      </CardMedia>

      <div className="py-3 px-2">
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

          <Link href={`/dashboard/projectList/${id}`}>
            <Button variant="outlined" size="small" endIcon={<EditIcon />}>
              edit
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  )
}

export default ProjectBox
