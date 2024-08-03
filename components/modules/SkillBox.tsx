"use client"

import React from "react"
import { toast } from "react-toastify"
import { Skill } from "@prisma/client"

import { deleteSkillFormAction } from "@/actions/skill/deleteSkill"

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

const SkillBox: React.FC<Skill> = ({ id, image, name, link, description }) => {
  const deleteSkill = async () => {
    const deleteResult = await deleteSkillFormAction(id, "/skillList")

    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }

  return (
    <Card className="min-w-72 max-w-80 relative">
      <IconButton
        onClick={deleteSkill}
        title="delete"
        className="!absolute left-1 top-1 bg-black/30"
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <CardMedia>
          <Image
            className="bg-white/50 w-20 h-10 mb-3 rounded-md"
            height={40}
            width={80}
            src={image}
            alt="skill image"
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

        <Link href={`/dashboard/skillList/${id}`}>
          <Button variant="outlined" size="small" endIcon={<EditIcon />}>
            edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default SkillBox
