import React from 'react'
import { Card } from '@/components/ui/card'

export function ManageOffers() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Manage Offers</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Offers</h2>
        {/* Add a table or list of collectors here */}
        <p>Offers content goes here</p>
      </Card>
    </div>
  )
}