import React from "react"
import { Project } from "@prisma/client"

import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import EditIcon from "@mui/icons-material/Edit"

import Link from "next/link"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

const ProjectBox: React.FC<Project> = ({ id, image, title, link, source, description }) => {
  return (
    <Card className="w-80">
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

        <Button variant="outlined" size="small" endIcon={<EditIcon />}>
          edit
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectBox
