"use client"

import React, { useEffect, useRef, useState } from "react"
import useChangeOrderTechnicalGrowth from "@/hooks/useChangeOrderTechnicalGrowth"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

import {
  TypeTechnicalGrowthTimeLineProps,
  TypeDragAndDropTechnicalGrowth,
} from "@/lib/types/technicalGrowth.type"

import { editOrderTechnicalGrowthFormAction } from "@/actions/technicalGrowth/editOrderTechnicalGrowth"
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

const TechGrTimeLine: React.FC<TypeTechnicalGrowthTimeLineProps> = ({ technicalGrowthList }) => {
  const [technicalGrowthListState, setTechnicalGrowthListState] = useState([...technicalGrowthList])
  const [isListUpdated, setIsListUpdated] = useState(false)
  const DragAndDropTechnicalGrowthRef = useRef<TypeDragAndDropTechnicalGrowth>({
    draggedTechnicalItemFrom: null,
    draggedTechnicalGrowthTo: null,
    originalTechnicalGrowthList: technicalGrowthList,
  })
  const { onDragEnter, onDragLeave, onDragOver, onDragStart, onDrop } =
    useChangeOrderTechnicalGrowth({
      DragAndDropTechnicalGrowthRef,
      technicalGrowthListState,
      setTechnicalGrowthListState,
      setIsListUpdated,
    })

  const updateAction = async () => {
    const updateResult = await editOrderTechnicalGrowthFormAction(
      technicalGrowthList,
      "/dashboard/tec_growth"
    )

    if (updateResult.status) {
      setIsListUpdated(false)
      DragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList = technicalGrowthList
      return toast.success(updateResult.message)
    }

    setTechnicalGrowthListState(technicalGrowthList)
    return toast.error(updateResult.message)
  }

  const resetTechnicalGrowthList = () => {
    setIsListUpdated(false)
    setTechnicalGrowthListState(DragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList)
  }

  const deleteTechnicalGrowth = async (id: string) => {
    const deleteResult = await deleteTechnicalGrowthFormAction(id, "/dashboard/tec_growth")

    if (deleteResult.status) return toast.success(deleteResult.message)

    return toast.error(deleteResult.message)
  }

  useEffect(() => {
    setTechnicalGrowthListState(technicalGrowthList)
    setIsListUpdated(false)
    DragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList = technicalGrowthList
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
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
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
            <Button className="py-3 mr-3" onClick={updateAction}>
              بروزرسانی لیست
            </Button>
            <Button className="py-3" color="error" onClick={resetTechnicalGrowthList}>
              بازگردانی لیست
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default TechGrTimeLine
