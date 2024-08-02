"use client"

import React, { useEffect, useRef, useState } from "react"
import { isEqual, map, reject, slice } from "lodash"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

import {
  TypeTechnicalGrowthTimeLineProps,
  TypeDragAndDropTechnicalGrowth,
  TypeUpdateTechnicalGrowthListParams,
} from "@/lib/types/technicalGrowth.type"
import { TechnicalGrowth } from "@prisma/client"

import { deleteTechnicalGrowthFormAction } from "@/actions/technicalGrowth/deleteTechnicalGrowth"

import DeleteIcon from "@mui/icons-material/Delete"
import EditNoteIcon from "@mui/icons-material/EditNote"

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import { Button, IconButton, Typography } from "@mui/material"
import EmptyBox from "../modules/EmptyBox"
import Link from "next/link"
import ResetTechnicalGrowthListButton from "../modules/ResetTechnicalGrowthListButton"
import UpdateTechnicalGrowthListButton from "../modules/UpdateTechnicalGrowthListButton"

const TechGrTimeLine: React.FC<TypeTechnicalGrowthTimeLineProps> = ({ technicalGrowthList }) => {
  const [technicalGrowthListState, setTechnicalGrowthListState] = useState([...technicalGrowthList])
  const [isListUpdated, setIsListUpdated] = useState(false)
  const dragAndDropTechnicalGrowthRef = useRef<TypeDragAndDropTechnicalGrowth>({
    draggedTechnicalItemFrom: null,
    draggedTechnicalGrowthTo: null,
    originalTechnicalGrowthList: technicalGrowthList,
  })

  const getPositionTechnicalGrowthItem = (event: React.DragEvent<HTMLDivElement>) => {
    const stringPosition = event.currentTarget.dataset.position
    if (stringPosition !== undefined && !isNaN(Number(stringPosition)))
      return Number(stringPosition)

    return null
  }

  const dragStart = (e: React.DragEvent<HTMLDivElement>) =>
    (dragAndDropTechnicalGrowthRef.current = {
      ...dragAndDropTechnicalGrowthRef.current,
      draggedTechnicalItemFrom: getPositionTechnicalGrowthItem(e),
    })

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const position = getPositionTechnicalGrowthItem(e)

    if (position !== dragAndDropTechnicalGrowthRef.current.draggedTechnicalItemFrom) {
      dragAndDropTechnicalGrowthRef.current = {
        ...dragAndDropTechnicalGrowthRef.current,
        draggedTechnicalGrowthTo: position,
      }

      e.currentTarget.classList.add("dropArea")
    }
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    e.currentTarget.classList.remove("dropArea")

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setUpdateTechnicalListOrder()

    dragAndDropTechnicalGrowthRef.current = {
      ...dragAndDropTechnicalGrowthRef.current,
      draggedTechnicalItemFrom: null,
      draggedTechnicalGrowthTo: null,
    }
    e.currentTarget.classList.remove("dropArea")
  }

  const setUpdateTechnicalListOrder = () => {
    const { draggedTechnicalItemFrom, draggedTechnicalGrowthTo } =
      dragAndDropTechnicalGrowthRef.current

    if (
      typeof draggedTechnicalItemFrom === "number" &&
      typeof draggedTechnicalGrowthTo === "number"
    ) {
      const technicalGrowthItemDragged = technicalGrowthListState[draggedTechnicalItemFrom]

      const remainingTechnicalGrowthItems = reject(
        technicalGrowthListState,
        (_, index) => index === draggedTechnicalItemFrom
      )

      updateTechnicalGrowthList({
        itemDragged: technicalGrowthItemDragged,
        draggedTo: draggedTechnicalGrowthTo,
        remainingItems: remainingTechnicalGrowthItems,
      })
    }
  }

  const updateTechnicalGrowthList = ({
    itemDragged,
    draggedTo,
    remainingItems,
  }: TypeUpdateTechnicalGrowthListParams) => {
    const newTechnicalGrowthList = [
      ...slice(remainingItems, 0, draggedTo),
      itemDragged,
      ...slice(remainingItems, draggedTo),
    ]

    setIsListUpdated(isTechEqual(newTechnicalGrowthList))
    setTechnicalGrowthListState(newTechnicalGrowthList)
  }

  const isTechEqual = (newTechnicalGrowthList: TechnicalGrowth[]) =>
    !isEqual(
      map(newTechnicalGrowthList, "id"),
      map(dragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList, "id")
    )

  const deleteTechnicalGrowth = async (id: string) => {
    const deleteResult = await deleteTechnicalGrowthFormAction(id, "/dashboard/tec_growth")

    if (deleteResult.status) return toast.success(deleteResult.message)

    return toast.error(deleteResult.message)
  }

  useEffect(() => {
    setTechnicalGrowthListState(technicalGrowthList)
    setIsListUpdated(false)
    dragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList = technicalGrowthList
  }, [technicalGrowthList])

  return (
    <div className="flex-1 p-6 mt-6 pb-0 flex flex-col rounded-lg">
      {technicalGrowthListState.length ? (
        <Timeline position="right">
          {technicalGrowthListState.map((item, index) => (
            <TimelineItem
              className={cn("h-fit mt-6 first:mt-0 cursor-move select-none group before:hidden")}
              data-position={index}
              draggable
              key={index}
              onDragStart={dragStart}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={drop}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <div>
                <div className="hidden gap-2 absolute left-1 top-1 group-hover:flex">
                  <IconButton
                    className="!bg-black/50 hidden group-hover:flex"
                    color="error"
                    onClick={() => deleteTechnicalGrowth(item.id)}
                    title="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link href={`/dashboard/tec_growth/${item.id}`}>
                    <IconButton className="!bg-black/50" color="primary" title="edit">
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
            <Link href={"#add"}>رشد فنی جدید</Link>
          </Button>
        </div>
      )}

      <div className="h-10 mt-6">
        {isListUpdated && (
          <>
            <UpdateTechnicalGrowthListButton
              reValidPath="/dashboard/tec_growth"
              currentTechnicalGrowthList={
                dragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList
              }
              newTechnicalGrowthList={technicalGrowthListState}
              setIsListUpdated={setIsListUpdated}
              setTechnicalGrowthListState={setTechnicalGrowthListState}
            />

            <ResetTechnicalGrowthListButton
              currentTechnicalGrowthList={
                dragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList
              }
              setIsListUpdated={setIsListUpdated}
              setTechnicalGrowthListState={setTechnicalGrowthListState}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default TechGrTimeLine
