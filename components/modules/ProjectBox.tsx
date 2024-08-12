"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"

import { deleteProjectFormAction } from "@/actions/project/deleteProject"

import { TypeProjectBoxComponentProps } from "@/lib/types/project.type"

import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import ReadMoreIcon from "@mui/icons-material/ReadMore"

import Link from "next/link"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  Typography,
} from "@mui/material"
import Image from "next/image"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: ".5rem",
  boxShadow: 24,
  p: 4,
}

const ProjectBox: React.FC<TypeProjectBoxComponentProps> = ({ project }) => {
  const summaryDescriptionText = project.description.split(" ").slice(0, 8).join(" ")
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteAction = async () => {
    const deleteResult = await deleteProjectFormAction(project.id, "/projectList")

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

      <div className="bg-gray-500/40 w-full h-52 flex justify-center overflow-hidden">
        <Image
          height={400}
          width={300}
          className="h-full w-auto"
          src={project.image}
          alt="project image"
        />
      </div>

      <div className="py-3 px-2">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="min-h-24 overflow-hidden"
          >
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {summaryDescriptionText}...
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={project.link}>
            <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
              link
            </Button>
          </Link>

          <Link href={project.source}>
            <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
              source
            </Button>
          </Link>

          <Link href={`/dashboard/project/${project.id}`}>
            <Button variant="outlined" size="small" endIcon={<EditIcon />}>
              edit
            </Button>
          </Link>

          <Button onClick={handleOpen} variant="outlined" size="small" aria-label="Read-more">
            <ReadMoreIcon />
          </Button>
        </CardActions>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="!mb-6" variant="h4" component="h4">
            {project.title}
          </Typography>
          <Typography>{project.description}</Typography>
        </Box>
      </Modal>
    </Card>
  )
}

export default ProjectBox
