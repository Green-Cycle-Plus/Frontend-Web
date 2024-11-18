import React from 'react'
import { Card } from '@/components/ui/card'

export function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Analytics</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        {/* Add charts and graphs for analytics here */}
        <p>Analytics content, charts, and graphs go here</p>
      </Card>
    </div>
  )
}