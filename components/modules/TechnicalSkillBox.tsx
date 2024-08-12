"use client"

import React from "react"
import { toast } from "react-toastify"
import { TechnicalSkill } from "@prisma/client"

import { deleteTechnicalSkillFormAction } from "@/actions/technicalSkill/deleteTechnicalSkill"

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

const TechnicalSkillBox: React.FC<TechnicalSkill> = ({ id, image, name, link, description }) => {
  const deleteTechnicalSkill = async () => {
    const deleteResult = await deleteTechnicalSkillFormAction(id, "/technicalskill")

    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }

  return (
    <Card className="min-w-72 w-full max-w-96 relative">
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
          {description}
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
      </CardActions>
    </Card>
  )
}

export default TechnicalSkillBox
