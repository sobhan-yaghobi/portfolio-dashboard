"use client"

import React from "react"
import { toast } from "react-toastify"

import { TypeUpdateTechnicalGrowthListButtonProps } from "@/lib/types/technicalGrowth.type"

import { editOrderTechnicalGrowthFormAction } from "@/actions/technicalGrowth/editOrderTechnicalGrowth"

import { Button } from "@mui/material"

const UpdateTechnicalGrowthListButton: React.FC<TypeUpdateTechnicalGrowthListButtonProps> = ({
  reValidPath,
  technicalGrowthLists,
  setStateActions,
}) => {
  const updateTechnicalGrowthList = async () => {
    const updateResult = await editOrderTechnicalGrowthFormAction(
      technicalGrowthLists.newList,
      reValidPath
    )

    if (updateResult.status) {
      setStateActions.isListUpdated(false)
      technicalGrowthLists.currentList = technicalGrowthLists.newList
      return toast.success(updateResult.message)
    }

    setStateActions.technicalGrowthListState(technicalGrowthLists.currentList)
    return toast.error(updateResult.message)
  }

  return (
    <Button className="py-3 mr-3" onClick={updateTechnicalGrowthList}>
      بروزرسانی لیست
    </Button>
  )
}

export default UpdateTechnicalGrowthListButton
