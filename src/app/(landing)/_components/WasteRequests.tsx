import React from 'react'
import WasteRequestCard from './WasteRequestCard'
import { Button } from '@/components/ui/button'

const WasteRequests = () => {
  return (
    <div className="w-full">
    <h4 className="text-[#121417] font-dms_sans font-semibold text-2xl mb-[37px]">Waste request </h4>
    <div className="flex flex-col lg:flex-row items-center gap-9">
    <WasteRequestCard price={100} quantity={10} location="Lagos" wasteType="Glass" wasteImg="/glass.svg" />
    <WasteRequestCard price={100} quantity={10} location="Lagos" wasteType="Glass" wasteImg="/glass.svg" />
    <WasteRequestCard price={100} quantity={10} location="Lagos" wasteType="Glass" wasteImg="/glass.svg" />
    </div>
    <div className="flex items-center justify-start gap-2 font-dms_sans mt-6">
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          {"<"}
        </Button>
        <Button variant="default" size="icon" className="bg-brandGreen rounded-full hover:bg-[#4CAF50]/90">
          1
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          2
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          3
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          4
        </Button>
        <span>...</span>
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          12
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-[#E4FFEE]">
          {">"}
        </Button>
      </div>

    </div>
  )
}

export default WasteRequests