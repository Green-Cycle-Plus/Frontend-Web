import React from 'react'
import { Card } from '@/components/ui/card'

export function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Total Waste Processed</h2>
          <p className="text-3xl font-bold">2,500 tons</p>
          <p className="text-sm text-[#497E5D]">+20.1% from last month</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Current Month Revenue</h2>
          <p className="text-3xl font-bold">$45,231.89</p>
          <p className="text-sm text-[#497E5D]">+15% from last month</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Active Collectors</h2>
          <p className="text-3xl font-bold">573</p>
          <p className="text-sm text-[#497E5D]">+201 since last month</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Pending Waste Requests</h2>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-[#497E5D]">-8 from yesterday</p>
        </Card>
      </div>
    </div>
  )
}