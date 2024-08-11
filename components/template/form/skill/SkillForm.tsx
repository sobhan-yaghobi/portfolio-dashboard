"use client"

import React, { useState } from "react"
import { find, some } from "lodash"
import { toast } from "react-toastify"
import { experienceYearTimeTitles } from "@/actions/skill/skillUtils"

import { Project } from "@prisma/client"
import { TypeSkillFormComponentProps } from "@/lib/types/skill.type"

import TitleIcon from "@mui/icons-material/Title"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import SubmitLoadingButton from "@/components/modules/SubmitLoadingButton"
import TextError from "@/components/modules/TextError"
import Image from "next/image"

const SkillForm = React.forwardRef<HTMLFormElement, TypeSkillFormComponentProps>(
  (
    {
      projectList,
      selectedProjectList,
      setSelectedProjectList,
      defaultValues,
      submitText,
      submitFunction,
      errors,
    },
    ref
  ) => {
    const [mainProject, setMainProject] = useState<Project | null>(null)

    const onChangeProject = (e: SelectChangeEvent<string>) => {
      const mainProject = find(projectList, function (item) {
        return item.id === e.target.value
      })
      setMainProject(mainProject ? mainProject : ({} as Project))
    }

    const createProject = () => {
      if (!mainProject || !("id" in mainProject)) return false

      const isProjectExistInSelectedProjectList = isProjectListSelected(mainProject.id)

      if (isProjectExistInSelectedProjectList)
        return toast.error("Project is already in selected project list")

      setSelectedProjectList((prev) => [...prev, mainProject])
      setMainProject({} as Project)
    }

    const removeProject = (projectId: string) =>
      setSelectedProjectList((prev) => prev.filter((item) => item.id !== projectId))

    const isProjectListSelected = (projectId: string) =>
      some(selectedProjectList, function (selectedProject) {
        return selectedProject.id === projectId
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
                alt="skill image"
                className="h-full w-auto rounded-2xl"
                height={500}
                src={defaultValues.image}
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
            نام مهارت
          </Typography>
          <TextError message={errors && errors?.name}>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.name}
              error={Boolean(errors && errors?.name)}
              name="name"
              placeholder="مانند javaScript"
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
            سطح تجربه
          </Typography>
          <div className="w-full flex gap-3">
            <TextError message={errors && errors?.experienceYearTime}>
              <FormControl className="w-full">
                <InputLabel id="demo-simple-select-label">سطح تجربه</InputLabel>
                <Select
                  defaultValue={defaultValues?.experienceYearTime}
                  id="demo-simple-select"
                  labelId="demo-simple-select-label"
                  label="سطح تجربه"
                  name="experienceYearTime"
                >
                  {Object.entries(experienceYearTimeTitles).map((experience) => (
                    <MenuItem value={experience[0]}>{experience[1]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TextError>
          </div>
        </section>

        <section>
          <Typography variant="subtitle1" component={"h5"}>
            پروژه های استفاده شده
          </Typography>
          <div className="w-full flex gap-3">
            <FormControl className="flex-1" onBlur={createProject}>
              <InputLabel id="demo-simple-select-helper-label">پروژه ها</InputLabel>
              <Select
                label="پروژه ای انتخاب کنید"
                onChange={onChangeProject}
                value={mainProject?.id || ""}
              >
                {projectList &&
                  projectList?.map((item) => (
                    <MenuItem
                      disabled={isProjectListSelected(item.id)}
                      key={item.id}
                      value={item.id}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <ul className="min-h-14 w-full flex flex-wrap gap-3">
            {selectedProjectList.map((item) => (
              <li
                className="bg-white/10 p-2 flex items-center rounded-md cursor-pointer"
                key={item.id}
              >
                <span className="px-2 mr-1">{item.title}</span>
                <IconButton
                  className="flex-1"
                  size="small"
                  onClick={() => removeProject(item.id)}
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
              لینک داکیومنت
            </Typography>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.link}
              dir="ltr"
              error={Boolean(errors && errors?.link)}
              name="link"
              placeholder="https://javascript.org"
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
          <TextError message={errors && errors?.description}>
            <Typography variant="subtitle1" component={"h5"}>
              متن توضیح مهارت
            </Typography>
            <TextField
              className="w-full"
              defaultValue={defaultValues && defaultValues.description}
              error={Boolean(errors && errors?.description)}
              size="small"
              multiline
              name="description"
              placeholder="در مورد مهارت خود بنویسید"
              rows={4}
              variant="outlined"
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
SkillForm.displayName = "SkillForm"

export default SkillForm
