"use client"

import React, { useState } from "react"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { IconButton } from "@mui/material"
import { Project } from "@prisma/client"
import { find, some } from "lodash"

type SkillsProps = {
  projects?: Project[]
  selectedProjects: Project[]
  setSelectedProjects: React.Dispatch<React.SetStateAction<Project[]>>
}

const Skills: React.FC<SkillsProps> = ({ projects, selectedProjects, setSelectedProjects }) => {
  const [mainProject, setMainProject] = useState<Project | null>(null)
  const handleChangeAction = (e: SelectChangeEvent<string>) => {
    const mainProject = find(projects, function (item) {
      return item.id === e.target.value
    })
    setMainProject(mainProject ? mainProject : ({} as Project))
  }
  const addProjectAction = () => {
    if (mainProject && "id" in mainProject) {
      const isSelect = selectedProjects.some(
        (selectedProject) => selectedProject.id === mainProject.id
      )

      if (!isSelect) {
        setSelectedProjects((prev) => [...prev, mainProject])
      }
    }
  }
  const removeProjectAction = (id: string) =>
    setSelectedProjects((prev) => prev.filter((item) => item.id !== id))
  const isSelected = (id: string) =>
    some(selectedProjects, function (selectedProject) {
      return selectedProject.id === id
    })
  return (
    <form className="[&>section]:mt-6 [&>section>*]:mb-3">
      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Logo
        </Typography>
        <input
          type="file"
          className="w-full p-4 rounded-md border border-solid border-white"
          id="logoFile"
          name="logo"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Title
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="like JavaScript"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Project Usage
        </Typography>
        <div className="w-full flex gap-3">
          <FormControl className="flex-1">
            <InputLabel id="demo-simple-select-helper-label">Projects</InputLabel>
            <Select label="Select Projects" onChange={handleChangeAction}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {projects &&
                projects?.map((item) => (
                  <MenuItem key={item.id} disabled={isSelected(item.id)} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            disabled={!mainProject}
            onClick={addProjectAction}
            size="large"
            className="w-2/12"
            variant="contained"
          >
            <AddIcon />
          </Button>
        </div>
        <ul className="min-h-14 w-full flex flex-wrap gap-3">
          {selectedProjects.map((item) => (
            <li
              className="bg-white/10 p-2 flex items-center rounded-md cursor-pointer"
              key={item.id}
            >
              <span className="px-2 mr-1">{item.title}</span>
              <IconButton
                onClick={() => removeProjectAction(item.id)}
                className="flex-1"
                size="small"
                color="error"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Article Link
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="https://javascript.org"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLinkIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </section>

      <section>
        <Typography variant="subtitle1" component={"h5"}>
          Desc
        </Typography>
        <TextField
          size="small"
          className="w-full"
          id="name"
          placeholder="about JavaScript"
          multiline
          rows={4}
          variant="outlined"
        />
      </section>

      <section>
        <Button className="w-full" variant="contained" size="large">
          Add Skill
        </Button>
      </section>
    </form>
  )
}

export default Skills
