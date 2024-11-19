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
      <div className="mb-8">
        <h1 className="text-[#228B22] text-2xl font-bold font-londrina">Greencycle+</h1>
      </div>

      <div className="space-y-6 font-dms_sans">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[15px] top-[30px] h-[calc(100%+24px)] w-[2px]",
                  step.status === 'completed' ? "bg-[#228B22]" : "bg-gray-200"
                )}
              />
            )}
            
            <div className="flex items-start gap-4">
              <div className="relative z-10">
                {step.status === 'completed' ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#228B22]">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                ) : step.status === 'current' ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#228B22] bg-white">
                    <FileText className="h-5 w-5 text-[#228B22]" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                    <div className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{step.title}</span>
                <span 
                  className={cn(
                    "font-medium",
                    step.status === 'current' ? "text-[#228B22]" : 
                    step.status === 'completed' ? "text-gray-900" : 
                    "text-gray-400"
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