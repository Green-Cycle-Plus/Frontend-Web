'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CollectorOverview } from './_components/collector-overview'
import { WasteRequests } from './_components/waste-requests'

export default function CollectorDashboard() {
  return (
    <div className="p-8 bg-[#F5FFF9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#228B22] mb-6">Collector Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Waste Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <CollectorOverview />
        </TabsContent>
        <TabsContent value="requests">
          <WasteRequests />
        </TabsContent>
      </Tabs>
    </div>
  )
}