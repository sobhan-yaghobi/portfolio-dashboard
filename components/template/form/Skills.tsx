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

const Skills: React.FC = () => {
  const [mainProject, setMainProject] = useState("")
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [allProjects, setAllProjects] = useState([
    { name: "project 1", selected: false },
    { name: "project 2", selected: false },
    { name: "project 3", selected: false },
    { name: "project 4", selected: false },
    { name: "project 5", selected: false },
    { name: "project 6", selected: false },
    { name: "project 7", selected: false },
    { name: "project 8", selected: false },
    { name: "project 9", selected: false },
    { name: "project 10", selected: false },
    { name: "project 11", selected: false },
  ])
  const toggleSelectedProjects = (item: string) => {
    setAllProjects((prev) => {
      const newAllProject = prev.map((prevItem) => {
        if (prevItem.name === item) {
          return { ...prevItem, selected: !prevItem.selected }
        }
        return prevItem
      })
      return newAllProject
    })
  }

  const handleChange = (event: SelectChangeEvent) => {
    setMainProject(event.target.value)
  }
  const addProjectAction = (item: string) => {
    setMainProject("")
    toggleSelectedProjects(item)
    setSelectedProjects((prev) => [...prev, item])
  }
  const removeProjectAction = (item: string) => {
    setSelectedProjects((prev) => prev.filter((prevItem) => prevItem !== item))
    toggleSelectedProjects(item)
  }

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
            <Select value={mainProject} label="Projects" onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allProjects.map((item) => (
                <MenuItem disabled={item.selected} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disabled={!mainProject}
            onClick={() => addProjectAction(mainProject)}
            size="large"
            className="w-2/12"
            variant="contained"
          >
            <AddIcon />
          </Button>
        </div>
        <ul className="min-h-14 w-full flex flex-wrap gap-3">
          {selectedProjects.map((item) => (
            <li className="bg-white/10 p-2 flex items-center rounded-md cursor-pointer" key={item}>
              <span className="px-2 mr-1">{item}</span>
              <Button
                onClick={() => removeProjectAction(item)}
                className="py-2"
                size="small"
                color="error"
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
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
