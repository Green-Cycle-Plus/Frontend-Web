'use client'

import React, { useState } from 'react'
import { StepSidebar } from './step-sidebar'
import { CompanyInformation } from './steps/company-information'
import { ServiceSetup } from './steps/service-setup'
import { UploadDocuments } from './steps/upload-documents'
import { ConfirmationApproval } from './steps/confirmation-approval'

export type StepStatus = 'completed' | 'current' | 'pending'

export interface Step {
  id: number
  title: string
  subtitle: string
  status: StepStatus
}

const initialSteps: Step[] = [
  { id: 1, title: 'Step 1', subtitle: 'Company Information', status: 'current' },
  { id: 2, title: 'Step 2', subtitle: 'Service Setup', status: 'pending' },
  { id: 3, title: 'Step 3', subtitle: 'Upload Documents', status: 'pending' },
  { id: 4, title: 'Step 3', subtitle: 'Confirmation and Approval', status: 'pending' },
]

export function RecyclerOnboardingWizard() {
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [currentStepId, setCurrentStepId] = useState(1)

  const updateStepStatus = (stepId: number, newStatus: StepStatus) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, status: newStatus } : step
      )
    )
  }

  const goToNextStep = () => {
    if (currentStepId < steps.length) {
      updateStepStatus(currentStepId, 'completed')
      setCurrentStepId(currentStepId + 1)
      updateStepStatus(currentStepId + 1, 'current')
    }
  }

  const goToPreviousStep = () => {
    if (currentStepId > 1) {
      updateStepStatus(currentStepId, 'pending')
      setCurrentStepId(currentStepId - 1)
      updateStepStatus(currentStepId - 1, 'current')
    }
  }

  const renderCurrentStep = () => {
    switch (currentStepId) {
      case 1:
        return <CompanyInformation onNext={goToNextStep} />
      case 2:
        return <ServiceSetup onNext={goToNextStep} onPrevious={goToPreviousStep} />
      case 3:
        return <UploadDocuments onNext={goToNextStep} onPrevious={goToPreviousStep} />
      case 4:
        return <ConfirmationApproval onPrevious={goToPreviousStep} />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F5FFF9] font-dms_sans">
      <StepSidebar steps={steps} currentStepId={currentStepId} />
      <div className="flex-1 p-6">
        {renderCurrentStep()}
      </div>
    </div>
  )
}