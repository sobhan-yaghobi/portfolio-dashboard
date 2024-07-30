"use client"

import React, { useState } from "react"
import { find, some } from "lodash"
import { toast } from "react-toastify"

import { ProjectFormProps } from "@/lib/types"
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

    const onChangeSkill = (e: SelectChangeEvent<string>) => {
      const mainSkill = find(skills, function (item) {
        return item.id === e.target.value
      })
      setMainSkill(mainSkill ? mainSkill : ({} as Skill))
    }

    const addSkill = () => {
      if (!mainSkill || !("id" in mainSkill)) return toast.error("Please select skill first")

      const isSkillExistInSelectedSkills = isSkillSelected(mainSkill.id)

      if (isSkillExistInSelectedSkills) return toast.error("Skill is already in selected skills")

      setSelectedSkills((prev) => [...prev, mainSkill])
      setMainSkill({} as Skill)
    }

    const removeSkill = (id: string) =>
      setSelectedSkills((prev) => prev.filter((item) => item.id !== id))

    const isSkillSelected = (id: string) =>
      some(selectedSkills, function (selectedSkills) {
        return selectedSkills.id === id
      })

    return (
      <form action={submitFunction} className="[&>section]:mt-6 [&>section>*]:mb-3" ref={ref}>
        <section>
          <Typography variant="subtitle1" component={"h5"}>
            عکس
          </Typography>
          {defaultValues?.image && (
            <div className="bg-gray-500/40 w-fit h-72 p-3 rounded-xl overflow-hidden">
              <Image
                alt="project image"
                className="h-full w-auto rounded-2xl"
                height={500}
                src={defaultValues?.image}
                width={500}
              />
            </div>
          )}
          <TextError message={errors && errors.image}>
            <input
              accept="image/*"
              className={`w-full p-4 rounded-md border border-solid ${
                errors && errors?.image ? "border-red-500" : "border-white"
              }`}
              name="image"
              type="file"
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            عنوان
          </Typography>
          <TextError message={errors && errors.title}>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.title}
              error={Boolean(errors && errors?.title)}
              name="title"
              placeholder="مانند داشبورد با next js"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            لینک پروژه
          </Typography>
          <TextError message={errors && errors.link}>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.link}
              dir="ltr"
              error={Boolean(errors && errors?.link)}
              name="link"
              placeholder="https://project.com"
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </TextError>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            لینک منبع پروژه
          </Typography>
          <TextError message={errors && errors.source}>
            <TextField
              dir="ltr"
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
            مهارت های استفاده شده
          </Typography>
          <div className="w-full flex gap-3">
            <FormControl className="flex-1" onBlur={addSkill}>
              <InputLabel id="demo-simple-select-helper-label">مهارت ها</InputLabel>
              <Select
                label="مهارتی انتخاب کنید"
                onChange={onChangeSkill}
                value={mainSkill?.id || ""}
              >
                {skills &&
                  skills?.map((item) => (
                    <MenuItem disabled={isSkillSelected(item.id)} key={item.id} value={item.id}>
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
                  className="flex-1"
                  color="error"
                  onClick={() => removeSkill(item.id)}
                  size="small"
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            متن توضیح پروژه
          </Typography>
          <TextError message={errors && errors.description}>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.description}
              error={Boolean(errors && errors?.description)}
              size="small"
              multiline
              name="description"
              placeholder="درمورد پروژه ی خود بنویسید"
              rows={4}
              variant="outlined"
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
