"use client"

import React from "react"
import { toast } from "react-toastify"
import { Skills } from "@prisma/client"

import { deleteSkillFormAction } from "@/actions/skill/deleteSkill"

import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import Link from "next/link"
import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"

const SkillBox: React.FC<Skills> = ({ id, image, name, link, description }) => {
  const deleteSkill = async () => {
    const deleteResult = await deleteSkillFormAction(id, "/skills")

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
        className="absolute right-1 top-1 bg-black/30"
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <div className="bg-white/50 w-20 h-10 mb-3 rounded-md" />
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

        <Link href={`/dashboard/skills/${id}`}>
          <Button variant="outlined" size="small" endIcon={<EditIcon />}>
            edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default SkillBox
