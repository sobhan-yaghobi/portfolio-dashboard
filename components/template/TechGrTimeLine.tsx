"use client"

import React, { useRef, useState } from "react"
import { TechnicalGrowth } from "@prisma/client"
import { cn } from "@/lib/utils"

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import EmptyBox from "../modules/EmptyBox"
import { Button, Typography } from "@mui/material"
import Link from "next/link"

type TechGrTimeLineProps = {
  techs: TechnicalGrowth[]
}

type TypeDragAndDrop = {
  draggedFrom: number | null
  draggedTo: number | null
}

const TechGrTimeLine: React.FC<TechGrTimeLineProps> = ({ techs }) => {
  const [list, setList] = useState([...techs])
  const dragAndDropRef = useRef<TypeDragAndDrop>({
    draggedFrom: null,
    draggedTo: null,
  })
  const getPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const positionString = event.currentTarget.dataset.position
    if (positionString !== undefined && !isNaN(Number(positionString))) {
      return Number(positionString)
    } else {
      return null
    }
  }

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
      const remainingItems = list.filter((_, index) => index !== draggedFrom)
      console.log("new List ", [
        ...remainingItems.slice(0, draggedTo),
        itemDragged,
        ...remainingItems.slice(draggedTo),
      ])

      setList([
        ...remainingItems.slice(0, draggedTo),
        itemDragged,
        ...remainingItems.slice(draggedTo),
      ])
    }
    dragAndDropRef.current = { draggedFrom: null, draggedTo: null }
    e.currentTarget.classList.remove("dropArea")
  }

  return (
    <div className="bg-slate-200/20 flex-1 p-6 mt-6 flex flex-col rounded-lg">
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
              className={cn("h-fit mt-32 first:mt-0 cursor-move select-none")}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <div>
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
    </div>
  )
}

export default TechGrTimeLine
