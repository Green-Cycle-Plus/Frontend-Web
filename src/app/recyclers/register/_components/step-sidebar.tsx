import React from 'react'
import { Check, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Step } from './recycler-onboarding-wizard';

interface StepSidebarProps {
  steps: Step[]
  currentStepId: number
}

export function StepSidebar({ steps, currentStepId }: StepSidebarProps) {
  return (
    <div className="w-80  p-6 ">
      <div className="mb-8 font-londorina">
        <h1 className="text-[#228B22] text-2xl font-bold font-londrina ">Greencycle+</h1>
      </div>

      <div className="space-y-6 font-dms_sans">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[19px] top-[39px] h-[calc(100%-15px)] w-[1.5px]",
                  step.status === 'completed' ? "bg-[#228B22]" : "bg-gray-200"
                )}
              />
            )}
            
            <div className="flex items-start gap-4">
              <div className="relative z-10">
                {step.status === 'completed' ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#D4D4D4]">
                    <div className='rounded-md p-1 bg-[#497E5D]'><Check className="h-3 w-3 text-white" /></div>
                  </div>
                ) : step.status === 'current' ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#D4D4D4] bg-white">
                    <step.icon className="h-5 w-5 font-medium" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#D4D4D4] bg-white">
                    <step.icon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{step.title}</span>
                <span 
                  className={cn(
                    "font-[600]",
                    step.status === 'current' ? "text-black" : 
                    step.status === 'completed' ? "text-gray-500" : 
                    "text-gray-300"
                  )}
                >
                  {step.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}