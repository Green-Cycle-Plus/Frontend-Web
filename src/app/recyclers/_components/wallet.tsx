import React from 'react'
import { Card } from '@/components/ui/card'

export function Wallet() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Wallet</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
        <p className="text-3xl font-bold">$12,345.67</p>
        {/* Add transaction history and other wallet features here */}
        <p className="mt-4">Transaction history and other wallet features go here</p>
      </Card>
    </div>
  )
}