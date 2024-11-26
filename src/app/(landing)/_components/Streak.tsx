"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"]

export default function WeeklyStreak() {
  const [completedDays, setCompletedDays] = useState<boolean[]>(Array(7).fill(false))

  const toggleDay = (index: number) => {
    const newCompletedDays = [...completedDays]
    newCompletedDays[index] = !newCompletedDays[index]
    setCompletedDays(newCompletedDays)
  }

  const calculateProgress = () => {
    const completedCount = completedDays.filter(Boolean).length
    return (completedCount / 7) * 100
  }

  return (
    <div className="">
      <div className="flex gap-5 mb-4">
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={day} className="flex flex-col gap-5 items-center">
                        <span className="text-sm mt-1">{day}</span>
            <Button
              variant={completedDays[index] ? "default" : "outline"}
              size="icon"
              className={`w-10 h-10 rounded-full ${
                completedDays[index] ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => toggleDay(index)}
            >
              {completedDays[index] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

