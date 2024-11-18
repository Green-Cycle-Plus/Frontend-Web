'use client'

import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { Overview } from './overview'
import { WasteRequests } from './waste-requests'
import { Collectors } from './collectors'
import { Wallet } from './wallet'
import { Analytics } from './analytics'
import { ManageOffers } from './manage-offers'

export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview')

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />
      case 'manage-offers':
        return <ManageOffers />
      case 'waste-requests':
        return <WasteRequests />
      case 'collectors':
        return <Collectors />
      case 'wallet':
        return <Wallet />
      case 'analytics':
        return <Analytics />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-[#F5FFF9]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 overflow-auto p-8">
        {renderActivePage()}
      </div>
    </div>
  )
}