import React from 'react'
import { Upload, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmationApprovalProps {
  onPrevious: () => void
}

export function ConfirmationApproval({ onPrevious }: ConfirmationApprovalProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Confirmation Approval</h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 h-20 w-20 rounded-lg bg-[#E8F5E9] p-4">
              <Upload className="h-full w-full text-[#228B22]" />
            </div>
            <p className="text-sm text-gray-500">Company Logo</p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-dashed border-gray-200 p-6">
          <div className="flex flex-col items-center justify-center">
            <Upload className="mb-2 h-10 w-10 text-gray-400" />
            <p className="mb-1 text-sm text-gray-900">License Document</p>
            <p className="text-sm text-gray-500">Drag & drop or click to choose files</p>
            <p className="mt-2 text-xs text-gray-400">Supported format: JPEG, PNG, PDF, WORD</p>
            <p className="text-xs text-gray-400">Max(2.5)</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help center
        </button>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={onPrevious}
          >
            Previous
          </Button>
        </div>
      </div>
    </div>
  )
}