"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import { TechnicalSkill } from "@prisma/client"

import { deleteTechnicalSkillFormAction } from "@/actions/technicalSkill/deleteTechnicalSkill"

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
  CardMedia,
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

const TechnicalSkillBox: React.FC<TechnicalSkill> = ({ id, image, name, link, description }) => {
  const summaryDescriptionText = description.split(" ").slice(0, 20).join(" ")
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const deleteTechnicalSkill = async () => {
    const deleteResult = await deleteTechnicalSkillFormAction(id, "/technicalskill")

    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }

  return (
    <Card className="min-w-72 w-full max-w-96 h-60 relative">
      <IconButton
        onClick={deleteTechnicalSkill}
        title="delete"
        className="!absolute left-1 top-1 bg-black/30"
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <CardMedia>
          <Image
            className="bg-gray-500/40 w-auto h-10 mb-3 p-1 rounded-md"
            height={40}
            width={80}
            src={image}
            alt="technicalSkill image"
          />
        </CardMedia>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {summaryDescriptionText}...
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={link}>
          <Button variant="outlined" size="small" endIcon={<OpenInNewIcon />}>
            link
          </Button>
        </Link>

        <Link href={`/dashboard/technicalskill/${id}`}>
          <Button variant="outlined" size="small" endIcon={<EditIcon />}>
            edit
          </Button>
        </Link>

        <Button onClick={handleOpen} variant="outlined" size="small" aria-label="Read-more">
          <ReadMoreIcon />
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className="!mb-6" variant="h4" component="h4">
            {name}
          </Typography>
          <Typography>{description}</Typography>
        </Box>
      </Modal>
    </Card>
  )
}

export default TechnicalSkillBox
