"use client"

import React, { useRef } from "react"
import { isEqual, map, reject, slice } from "lodash"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

import {
  TypeSetUpdateTechnicalListOrderParams,
  TypeTechnicalGrowthItemProps,
  TypeUpdateTechnicalGrowthListParams,
} from "@/lib/types/technicalGrowth.type"
import { TechnicalGrowth } from "@prisma/client"

import { deleteTechnicalGrowthFormAction } from "@/actions/technicalGrowth/deleteTechnicalGrowth"

import DeleteIcon from "@mui/icons-material/Delete"
import EditNoteIcon from "@mui/icons-material/EditNote"

import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import { IconButton, Link, Typography } from "@mui/material"

const TechnicalGrowthItem: React.FC<TypeTechnicalGrowthItemProps> = ({
  technicalGrowth,
  setStateActions,
  dargAndDropRef,
  technicalGrowthListState,
}) => {
  const TechnicalGrowthElementRef = useRef<HTMLDivElement>(null)

  const dragStart = () => {
    dargAndDropRef.current = {
      ...dargAndDropRef.current,
      draggedTechnicalItemFrom: technicalGrowth.positionNumber,
    }
  }

  const dragEnter = () => {
    if (technicalGrowth.positionNumber !== dargAndDropRef.current.draggedTechnicalItemFrom) {
      dargAndDropRef.current = {
        ...dargAndDropRef.current,
        draggedTechnicalGrowthTo: technicalGrowth.positionNumber,
      }

      TechnicalGrowthElementRef.current?.classList.add("dropArea")
    }
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const dragLeave = () => TechnicalGrowthElementRef.current?.classList.remove("dropArea")

  const drop = () => {
    setUpdateTechnicalListOrder({
      dargAndDropRef,
      setStateActions,
      technicalGrowthListState,
    })

    dargAndDropRef.current = {
      ...dargAndDropRef.current,
      draggedTechnicalItemFrom: null,
      draggedTechnicalGrowthTo: null,
    }
    TechnicalGrowthElementRef.current?.classList.remove("dropArea")
  }

  const deleteTechnicalGrowth = async () => {
    const deleteResult = await deleteTechnicalGrowthFormAction(
      technicalGrowth.info.id,
      "/dashboard/tec_growth"
    )

    if (deleteResult.status) return toast.success(deleteResult.message)

    return toast.error(deleteResult.message)
  }

  return (
    <TimelineItem
      ref={TechnicalGrowthElementRef}
      className={cn("h-fit mt-6 first:mt-0 cursor-move select-none group before:hidden")}
      draggable
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
            onClick={deleteTechnicalGrowth}
            title="delete"
          >
            <DeleteIcon />
          </IconButton>
          <Link href={`/dashboard/tec_growth/${technicalGrowth.info.id}`}>
            <IconButton className="!bg-black/50" color="primary" title="edit">
              <EditNoteIcon />
            </IconButton>
          </Link>
        </div>
        <TimelineContent>
          <Typography variant="h5">{technicalGrowth.info.title}</Typography>
          <Typography fontSize={16} variant="h6">
            {technicalGrowth.info.subtitle}
          </Typography>
          <p>{technicalGrowth.info.description}</p>
        </TimelineContent>
      </div>
    </TimelineItem>
  )
}

const setUpdateTechnicalListOrder = ({
  dargAndDropRef,
  setStateActions,
  technicalGrowthListState,
}: TypeSetUpdateTechnicalListOrderParams) => {
  const { draggedTechnicalItemFrom, draggedTechnicalGrowthTo } = dargAndDropRef.current

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
      setStateActions,
      technicalGrowth: {
        itemDragged: technicalGrowthItemDragged,
        draggedTo: draggedTechnicalGrowthTo,
      },
      technicalGrowthLists: {
        currentList: dargAndDropRef.current.currentTechnicalGrowthList,
        remainingItemsList: remainingTechnicalGrowthItems,
      },
    })
  }
}

const updateTechnicalGrowthList = ({
  setStateActions,
  technicalGrowth,
  technicalGrowthLists,
}: TypeUpdateTechnicalGrowthListParams) => {
  const newTechnicalGrowthList = [
    ...slice(technicalGrowthLists.remainingItemsList, 0, technicalGrowth.draggedTo),
    technicalGrowth.itemDragged,
    ...slice(technicalGrowthLists.remainingItemsList, technicalGrowth.draggedTo),
  ]

  setStateActions.isListUpdated(
    isTechEqual(technicalGrowthLists.currentList, newTechnicalGrowthList)
  )
  setStateActions.technicalGrowthListState(newTechnicalGrowthList)
}

const isTechEqual = (
  currentTechnicalGrowthList: TechnicalGrowth[],
  newTechnicalGrowthList: TechnicalGrowth[]
) => !isEqual(map(currentTechnicalGrowthList, "id"), map(newTechnicalGrowthList, "id"))

export default TechnicalGrowthItem
