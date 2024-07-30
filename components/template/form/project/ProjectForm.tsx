"use client"

import React, { useState } from "react"
import { find, some } from "lodash"

import { TypeError } from "@/lib/definition"
import { TypeProjectInput } from "@/lib/types"
import { Skill } from "@prisma/client"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import TextError from "@/components/modules/TextError"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import Image from "next/image"

type ProjectFormProps = {
  skills?: Skill[]
  selectedSkills: Skill[]
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[]>>
  defaultValues?: TypeProjectInput | null
  submitText: string
  errors: TypeError
  submitFunction: (formData: FormData) => void | any
}

const ProjectForm = React.forwardRef<HTMLFormElement, ProjectFormProps>(
  (
    {
      skills,
      selectedSkills,
      setSelectedSkills,
      defaultValues,
      submitText,
      submitFunction,
      errors,
    },
    ref
  ) => {
    const [mainSkill, setMainSkill] = useState<Skill | null>(null)
    const handleChangeAction = (e: SelectChangeEvent<string>) => {
      const mainSkill = find(skills, function (item) {
        return item.id === e.target.value
      })
      setMainSkill(mainSkill ? mainSkill : ({} as Skill))
    }
    const addSkillAction = () => {
      if (mainSkill && "id" in mainSkill) {
        const isSelect = selectedSkills.some((selectedSkills) => selectedSkills.id === mainSkill.id)

        if (!isSelect) {
          setSelectedSkills((prev) => [...prev, mainSkill])
          setMainSkill({} as Skill)
        }
      }
    }
    const removeSkillAction = (id: string) =>
      setSelectedSkills((prev) => prev.filter((item) => item.id !== id))
    const isSelected = (id: string) =>
      some(selectedSkills, function (selectedSkills) {
        return selectedSkills.id === id
      })

    return (
      <form ref={ref} action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3">
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Image
          </Typography>
          {defaultValues?.image && (
            <div className="bg-gray-500/40 w-fit h-72 p-3 rounded-xl overflow-hidden">
              <Image
                height={1000}
                width={1000}
                src={defaultValues?.image}
                className="h-full w-auto rounded-2xl"
                alt="project image"
              />
            </div>
          )}
          <TextError message={errors && errors.image}>
            <input
              name="image"
              type="file"
              accept="image/*"
              className={`w-full p-4 rounded-md border border-solid ${
                errors && errors?.image ? "border-red-500" : "border-white"
              }`}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Title
          </Typography>
          <TextError message={errors && errors.title}>
            <TextField
              size="small"
              className="w-full"
              name="title"
              placeholder="like next js dashboard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              error={Boolean(errors && errors?.title)}
              defaultValue={defaultValues && defaultValues.title}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Project Link
          </Typography>
          <TextError message={errors && errors.link}>
            <TextField
              size="small"
              className="w-full"
              name="link"
              placeholder="https://project.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              error={Boolean(errors && errors?.link)}
              defaultValue={defaultValues && defaultValues.link}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Source Link
          </Typography>
          <TextError message={errors && errors.source}>
            <TextField
              size="small"
              className="w-full"
              name="source"
              placeholder="https://source.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              error={Boolean(errors && errors?.source)}
              defaultValue={defaultValues && defaultValues.source}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            Skills Usage {skills?.length}
          </Typography>
          <div className="w-full flex gap-3">
            <FormControl className="flex-1" onBlur={addSkillAction}>
              <InputLabel id="demo-simple-select-helper-label">Skills</InputLabel>
              <Select
                label="Select Skill"
                onChange={handleChangeAction}
                value={mainSkill?.id || ""}
              >
                {skills &&
                  skills?.map((item) => (
                    <MenuItem key={item.id} disabled={isSelected(item.id)} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <ul className="min-h-14 w-full flex flex-wrap gap-3">
            {selectedSkills.map((item) => (
              <li
                className="bg-white/10 p-2 flex items-center rounded-md cursor-pointer"
                key={item.id}
              >
                <span className="px-2 mr-1">{item.name}</span>
                <IconButton
                  onClick={() => removeSkillAction(item.id)}
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
            Desc
          </Typography>
          <TextError message={errors && errors.description}>
            <TextField
              size="small"
              className="w-full"
              name="description"
              placeholder="about project"
              multiline
              rows={4}
              variant="outlined"
              error={Boolean(errors && errors?.description)}
              defaultValue={defaultValues && defaultValues.description}
            />
          </TextError>
        </section>

        <section>
          <SubmitLoadingButton submitText={submitText} variant="contained" />
        </section>
      </form>
    )
  }
)
ProjectForm.displayName = "ProjectForm"

export default ProjectForm
