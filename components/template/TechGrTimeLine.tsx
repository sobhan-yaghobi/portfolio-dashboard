"use client"

import React, { useEffect, useRef, useState } from "react"
import { TechnicalGrowth } from "@prisma/client"
import { cn } from "@/lib/utils"
import { isEqual, map, reject, slice } from "lodash"
import { toast } from "react-toastify"

import { deleteTechnicalGrowth, editOrder } from "@/actions/TecnicalGrowth"

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import EmptyBox from "../modules/EmptyBox"
import { Button, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { Delete as DeleteIcon, EditNote as EditNoteIcon } from "@mui/icons-material"

type TechGrTimeLineProps = {
  techs: TechnicalGrowth[]
}

type TypeDragAndDrop = {
  draggedFrom: number | null
  draggedTo: number | null
  originalArray: TechnicalGrowth[]
}

const TechGrTimeLine: React.FC<TechGrTimeLineProps> = ({ techs }) => {
  const [list, setList] = useState([...techs])
  const dragAndDropRef = useRef<TypeDragAndDrop>({
    draggedFrom: null,
    draggedTo: null,
    originalArray: techs,
  })
  const [isUpdate, setIsUpdate] = useState(false)
  const getPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const positionString = event.currentTarget.dataset.position
    if (positionString !== undefined && !isNaN(Number(positionString))) {
      return Number(positionString)
    } else {
      return null
    }
  }
  const isTechEqual = (newTec: TechnicalGrowth[]) =>
    !isEqual(map(newTec, "id"), map(dragAndDropRef.current.originalArray, "id"))

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    (dragAndDropRef.current = { ...dragAndDropRef.current, draggedFrom: getPosition(e) })

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const position = getPosition(e)
    if (position !== dragAndDropRef.current.draggedFrom) {
      dragAndDropRef.current = { ...dragAndDropRef.current, draggedTo: position }
      e.currentTarget.classList.add("dropArea")
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    e.currentTarget.classList.remove("dropArea")

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const { draggedFrom, draggedTo } = dragAndDropRef.current
    if (typeof draggedFrom === "number" && typeof draggedTo === "number") {
      const itemDragged = list[draggedFrom]
      const remainingItems = reject(list, (_, index) => index === draggedFrom)
      const newList = [
        ...slice(remainingItems, 0, draggedTo),
        itemDragged,
        ...slice(remainingItems, draggedTo),
      ]

      setIsUpdate(isTechEqual(newList))
      setList(newList)
    }
    dragAndDropRef.current = { ...dragAndDropRef.current, draggedFrom: null, draggedTo: null }
    e.currentTarget.classList.remove("dropArea")
  }

  const updateAction = async () => {
    const updateResult = await editOrder(list)
    setIsUpdate(false)
    if (updateResult.status) {
      dragAndDropRef.current.originalArray = list
      return toast.success(updateResult.message)
    }
    setList(techs)
    return toast.error(updateResult.message)
  }
  const resetAction = () => {
    setIsUpdate(false)
    setList(dragAndDropRef.current.originalArray)
  }

  const deleteAction = async (id: string) => {
    const deleteResult = await deleteTechnicalGrowth(id, "/tec_growth")
    if (deleteResult.status) {
      return toast.success(deleteResult.message)
    }
    return toast.error(deleteResult.message)
  }

  useEffect(() => {
    setList(techs)
    dragAndDropRef.current.originalArray = techs
  }, [techs])

  return (
    <div className="flex-1 p-6 mt-6 pb-0 flex flex-col rounded-lg">
      {techs.length ? (
        <Timeline position="left">
          {list.map((item, index) => (
            <TimelineItem
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={cn("h-fit mt-6 first:mt-0 cursor-move select-none group")}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <div>
                <div className="flex gap-2 absolute left-1 top-1">
                  <IconButton
                    onClick={() => deleteAction(item.id)}
                    title="delete"
                    className="bg-black/30 hidden group-hover:flex"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link href={`/tec_growth/${item.id}`}>
                    <IconButton
                      title="edit"
                      className="bg-black/30 hidden group-hover:flex"
                      color="primary"
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Link>
                </div>
                <TimelineContent>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography fontSize={16} variant="h6">
                    {item.subtitle}
                  </Typography>
                  <p>{item.description}</p>
                </TimelineContent>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <EmptyBox message="Technical Growth TimeLine Is Empty" className="h-fit" />
          <Button className="w-fit">
            <Link href={"#add"}>new</Link>
          </Button>
        </div>
      )}
      <div className="h-10 mt-6">
        {isUpdate && (
          <>
            <Button className="py-3 mr-3" onClick={updateAction}>
              Update
            </Button>
            <Button color="error" className="py-3" onClick={resetAction}>
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default TechGrTimeLine
