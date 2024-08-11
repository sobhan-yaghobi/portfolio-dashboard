"use client"

import React from "react"
import { SoftSkill } from "@prisma/client"
import { toast } from "react-toastify"

import { deleteSoftSkillFormAction } from "@/actions/softSkill/deleteSoftSkill"

import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material"
import Link from "next/link"

const SoftSkillBox: React.FC<SoftSkill> = ({ id, name, score }) => {
  const deleteTechnicalSkill = async () => {
    const deleteResult = await deleteSoftSkillFormAction(id, "/technicalSkillList")

    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }

  return (
    <Card className="min-w-72 max-w-80 relative">
      <IconButton
        onClick={deleteTechnicalSkill}
        title="delete"
        className="!absolute left-1 top-1 bg-black/30"
        color="error"
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Rating name="half-rating-read" defaultValue={score} readOnly />
      </CardContent>
      <CardActions>
        <Link href={`/dashboard/technicalSkillList/${id}`}>
          <Button variant="outlined" size="small" endIcon={<EditIcon />}>
            edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default SoftSkillBox
