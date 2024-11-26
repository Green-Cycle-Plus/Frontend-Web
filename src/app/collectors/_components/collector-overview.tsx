import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Truck, CheckCircle, AlertCircle } from 'lucide-react'

export function CollectorOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Waste Collected</CardTitle>
          <Trash2 className="h-4 w-4 text-[#228B22]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234 kg</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          <Truck className="h-4 w-4 text-[#228B22]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">3 urgent requests</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Requests</CardTitle>
          <CheckCircle className="h-4 w-4 text-[#228B22]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues Reported</CardTitle>
          <AlertCircle className="h-4 w-4 text-[#228B22]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Resolved: 2</p>
        </CardContent>
      </Card>
    </div>
  )
}