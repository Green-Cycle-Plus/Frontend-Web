import { BarChart, Trash2, Users, Wallet } from 'lucide-react'

const sidebarItems = [
  { id: 'overview', icon: BarChart, label: 'Overview' },
  { id: 'manage-offers', icon: BarChart, label: 'Manage Offers' },
  { id: 'waste-requests', icon: Trash2, label: 'Waste Requests' },
  { id: 'collectors', icon: Users, label: 'Collectors' },
  { id: 'wallet', icon: Wallet, label: 'Wallet' },
  { id: 'analytics', icon: BarChart, label: 'Analytics' },
]

export function Sidebar({ activePage, setActivePage }: {
  activePage: string
  setActivePage: (page: string) => void
}) {
  return (
    <div className="w-64 bg-[#497E5D] text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <Trash2 className="h-6 w-6" />
        <span className="text-xl font-bold">GreenCycle+</span>
      </div>
      <nav>
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center gap-2 w-full p-2 rounded-md mb-2 ${
              activePage === item.id ? 'bg-[#228B22]' : 'hover:bg-[#228B22] hover:bg-opacity-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {/* <div className="mt-auto pt-4">
        <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-[#228B22] hover:bg-opacity-50">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div> */}
    </div>
  )
}