"use client"

import React from "react"
import { toast } from "react-toastify"

import { TypeUpdateTechnicalGrowthListButtonProps } from "@/lib/types/technicalGrowth.type"

import { editOrderTechnicalGrowthFormAction } from "@/actions/technicalGrowth/editOrderTechnicalGrowth"

import { Button } from "@mui/material"

const UpdateTechnicalGrowthListButton: React.FC<TypeUpdateTechnicalGrowthListButtonProps> = ({
  reValidPath,
  newTechnicalGrowthList,
  currentTechnicalGrowthList,
  setTechnicalGrowthListState,
  setIsListUpdated,
}) => {
  const updateTechnicalGrowthList = async () => {
    const updateResult = await editOrderTechnicalGrowthFormAction(
      newTechnicalGrowthList,
      reValidPath
    )

    if (updateResult.status) {
      setIsListUpdated(false)
      currentTechnicalGrowthList = newTechnicalGrowthList
      return toast.success(updateResult.message)
    }

    setTechnicalGrowthListState(currentTechnicalGrowthList)
    return toast.error(updateResult.message)
  }

  return (
    <Button className="py-3 mr-3" onClick={updateTechnicalGrowthList}>
      بروزرسانی لیست
    </Button>
  )
}

export default UpdateTechnicalGrowthListButton
