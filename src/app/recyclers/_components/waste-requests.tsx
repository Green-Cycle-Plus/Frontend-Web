import React from 'react'
import { Card } from '@/components/ui/card'

export function WasteRequests() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Waste Requests</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
        {/* Add a table or list of waste requests here */}
        <p>Waste requests content goes here</p>
      </Card>
    </div>
  )
}