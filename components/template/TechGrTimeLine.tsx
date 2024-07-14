import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import { TechnicalGrowth } from "@prisma/client"
import React from "react"
import EmptyBox from "../modules/EmptyBox"
import { Button } from "@mui/material"
import Link from "next/link"

type TechGrTimeLineProps = {
  techs: TechnicalGrowth[]
}

const TechGrTimeLine: React.FC<TechGrTimeLineProps> = ({ techs }) => {
  return (
    <div className="bg-black/30 h-full p-6 mt-6 rounded-lg overflow-y-auto">
      {techs.length ? (
        <Timeline position="alternate">
          {techs.map((item) => (
            <TimelineItem key={item.id}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <h5 className="text-lg">{item.subtitle}</h5>
                <p>{item.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
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
