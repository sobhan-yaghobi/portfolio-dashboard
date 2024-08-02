"use client"

import React, { useEffect, useRef, useState } from "react"

import {
  TypeTechnicalGrowthTimeLineProps,
  TypeDragAndDropTechnicalGrowth,
} from "@/lib/types/technicalGrowth.type"

import Link from "next/link"
import { Button } from "@mui/material"
import EmptyBox from "../modules/EmptyBox"
import { Timeline } from "@mui/lab"
import TechnicalGrowthItem from "../modules/TechnicalGrowthItem"
import ResetTechnicalGrowthListButton from "../modules/ResetTechnicalGrowthListButton"
import UpdateTechnicalGrowthListButton from "../modules/UpdateTechnicalGrowthListButton"

const TechGrTimeLine: React.FC<TypeTechnicalGrowthTimeLineProps> = ({ technicalGrowthList }) => {
  const [technicalGrowthListState, setTechnicalGrowthListState] = useState([...technicalGrowthList])
  const [isListUpdated, setIsListUpdated] = useState(false)
  const dragAndDropTechnicalGrowthRef = useRef<TypeDragAndDropTechnicalGrowth>({
    draggedTechnicalItemFrom: null,
    draggedTechnicalGrowthTo: null,
    currentTechnicalGrowthList: technicalGrowthList,
  })

  useEffect(() => {
    setTechnicalGrowthListState(technicalGrowthList)
    setIsListUpdated(false)
    dragAndDropTechnicalGrowthRef.current.currentTechnicalGrowthList = technicalGrowthList
  }, [technicalGrowthList])

  return (
    <div className="flex-1 p-6 mt-6 pb-0 flex flex-col rounded-lg">
      {technicalGrowthListState.length ? (
        <Timeline position="right">
          {technicalGrowthListState.map((item, index) => (
            <TechnicalGrowthItem
              key={item.id}
              technicalGrowth={{
                info: item,
                positionNumber: index,
              }}
              setStateActions={{
                isListUpdated: setIsListUpdated,
                technicalGrowthListState: setTechnicalGrowthListState,
              }}
              dargAndDropRef={dragAndDropTechnicalGrowthRef}
              technicalGrowthListState={technicalGrowthListState}
            />
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
              reValidPath="/dashboard/technicalgrowth"
              technicalGrowthLists={{
                currentList: dragAndDropTechnicalGrowthRef.current.currentTechnicalGrowthList,
                newList: technicalGrowthListState,
              }}
              setStateActions={{
                isListUpdated: setIsListUpdated,
                technicalGrowthListState: setTechnicalGrowthListState,
              }}
            />

            <ResetTechnicalGrowthListButton
              currentTechnicalGrowthList={
                dragAndDropTechnicalGrowthRef.current.currentTechnicalGrowthList
              }
              setStateActions={{
                isListUpdated: setIsListUpdated,
                technicalGrowthListState: setTechnicalGrowthListState,
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default TechGrTimeLine
