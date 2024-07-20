"use client"

import React, { useState } from "react"
import { find, some } from "lodash"

import { Project } from "@prisma/client"
import { TypeError } from "@/actions/definition"
import { TypeSkillInput } from "@/lib/types"

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
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import TextError from "@/components/modules/TextError"

type FormProps = {
  projects?: Project[]
  selectedProjects: Project[]
  setSelectedProjects: React.Dispatch<React.SetStateAction<Project[]>>
  defaultValues?: TypeSkillInput | null
  submitText: string
  submitFunction: (formData: FormData) => void | any
  errors: TypeError
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      projects,
      selectedProjects,
      setSelectedProjects,
      defaultValues,
      submitText,
      submitFunction,
      errors,
    },
    ref
  ) => {
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
          setMainProject({} as Project)
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
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Image
          </Typography>
          <TextError message={errors && errors.image}>
            <input
              name="image"
              type="file"
              className={`w-full p-4 rounded-md border border-solid ${
                errors && errors?.image ? "border-red-500" : "border-white"
              }`}
            />
            {defaultValues && defaultValues.image && <span>Default : {defaultValues.image}</span>}
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Name
          </Typography>
          <TextError message={errors && errors?.name}>
            <TextField
              error={Boolean(errors && errors?.name)}
              size="small"
              className="w-full"
              name="name"
              placeholder="like JavaScript"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              defaultValue={defaultValues && defaultValues.name}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Project Usage
          </Typography>
          <div className="w-full flex gap-3">
            <FormControl className="flex-1" onBlur={addProjectAction}>
              <InputLabel id="demo-simple-select-helper-label">Projects</InputLabel>
              <Select
                label="Select Projects"
                onChange={handleChangeAction}
                value={mainProject?.id || "none"}
              >
                <MenuItem value="none">
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
          <TextError message={errors && errors?.link}>
            <Typography variant="subtitle1" component={"h5"}>
              Article Link
            </Typography>
            <TextField
              error={Boolean(errors && errors?.link)}
              size="small"
              className="w-full"
              name="link"
              placeholder="https://javascript.org"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              defaultValue={defaultValues && defaultValues.link}
            />
          </TextError>
        </section>

        <section>
          <TextError message={errors && errors?.description}>
            <Typography variant="subtitle1" component={"h5"}>
              Desc
            </Typography>
            <TextField
              error={Boolean(errors && errors?.description)}
              size="small"
              className="w-full"
              name="description"
              placeholder="about JavaScript"
              multiline
              rows={4}
              variant="outlined"
              defaultValue={defaultValues && defaultValues.description}
            />
          </TextError>
        </section>

        <section>
          <SubmitLoadingButton submitText={submitText} />
        </section>
      </form>
    )
  }
)

export default Form
