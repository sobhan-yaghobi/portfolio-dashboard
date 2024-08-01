import { isEqual, map, reject, slice } from "lodash"

import { TechnicalGrowth } from "@prisma/client"
import {
  TypeDragAndDropTechnicalGrowth,
  TypeUpdateTechnicalGrowthListParams,
} from "@/lib/types/technicalGrowth.type"

type useChangeOrderTechnicalGrowthProps = {
  DragAndDropTechnicalGrowthRef: React.MutableRefObject<TypeDragAndDropTechnicalGrowth>
  technicalGrowthListState: TechnicalGrowth[]
  setTechnicalGrowthListState: React.Dispatch<React.SetStateAction<TechnicalGrowth[]>>
  setIsListUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

const useChangeOrderTechnicalGrowth = ({
  DragAndDropTechnicalGrowthRef,
  technicalGrowthListState,
  setTechnicalGrowthListState,
  setIsListUpdated,
}: useChangeOrderTechnicalGrowthProps) => {
  const getPositionTechnicalGrowthItem = (event: React.DragEvent<HTMLDivElement>) => {
    const stringPosition = event.currentTarget.dataset.position
    if (stringPosition !== undefined && !isNaN(Number(stringPosition)))
      return Number(stringPosition)

    return null
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    (DragAndDropTechnicalGrowthRef.current = {
      ...DragAndDropTechnicalGrowthRef.current,
      draggedTechnicalItemFrom: getPositionTechnicalGrowthItem(e),
    })

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const position = getPositionTechnicalGrowthItem(e)

    if (position !== DragAndDropTechnicalGrowthRef.current.draggedTechnicalItemFrom) {
      DragAndDropTechnicalGrowthRef.current = {
        ...DragAndDropTechnicalGrowthRef.current,
        draggedTechnicalGrowthTo: position,
      }

      e.currentTarget.classList.add("dropArea")
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    e.currentTarget.classList.remove("dropArea")

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setUpdateTechnicalListOrder()

    DragAndDropTechnicalGrowthRef.current = {
      ...DragAndDropTechnicalGrowthRef.current,
      draggedTechnicalItemFrom: null,
      draggedTechnicalGrowthTo: null,
    }
    e.currentTarget.classList.remove("dropArea")
  }

  const setUpdateTechnicalListOrder = () => {
    const { draggedTechnicalItemFrom, draggedTechnicalGrowthTo } =
      DragAndDropTechnicalGrowthRef.current

    if (draggedTechnicalItemFrom && draggedTechnicalGrowthTo) {
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

    console.log("updateTechnicalGrowthList")
    setIsListUpdated(isTechEqual(newTechnicalGrowthList))
    setTechnicalGrowthListState(newTechnicalGrowthList)
  }

  const isTechEqual = (newTechnicalGrowthList: TechnicalGrowth[]) =>
    !isEqual(
      map(newTechnicalGrowthList, "id"),
      map(DragAndDropTechnicalGrowthRef.current.originalTechnicalGrowthList, "id")
    )

  return {
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
  }
}

export default useChangeOrderTechnicalGrowth
