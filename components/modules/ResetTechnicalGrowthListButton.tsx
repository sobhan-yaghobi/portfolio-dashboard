"use client"

import React from "react"

import { TypeResetTechnicalGrowthListButtonProps } from "@/lib/types/technicalGrowth.type"

import { Button } from "@mui/material"

const ResetTechnicalGrowthListButton: React.FC<TypeResetTechnicalGrowthListButtonProps> = ({
  currentTechnicalGrowthList,
  setTechnicalGrowthListState,
  setIsListUpdated,
}) => {
  const resetTechnicalGrowthList = () => {
    setIsListUpdated(false)
    setTechnicalGrowthListState(currentTechnicalGrowthList)
  }

  return (
    <Button className="py-3" color="error" onClick={resetTechnicalGrowthList}>
      بازگردانی لیست
    </Button>
  )
}

export default ResetTechnicalGrowthListButton
