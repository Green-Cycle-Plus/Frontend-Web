import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function WasteRequestCard({price, quantity, wasteType, wasteImg, location}:{
    price: number,
    quantity: number,
    location: string,
    wasteType: string,
    wasteImg: string
}) {
  return (
    <Card className="w-full lg:w-[288px] rounded-[9.7px] bg-white p-4">
      <CardContent className="p-0 space-y-4 font-dms_sans">
        <div className="bg-gradient-to-r from-[#DAFFDA] to-[#237823] rounded-xl flex items-center justify-center">
        <Image src={wasteImg} alt="recycle" width={142} height={214} />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-[#C0C0C0] font-normal text-sm">Price:</span>
            <span className="font-normal text-brandText text-sm">{price}points</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-[#C0C0C0] font-normal text-sm">No:</span>
            <span>{quantity}{wasteType}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-[#C0C0C0] font-normal text-sm">Location:</span>
            <span>{location}</span>
          </div>
          
          <div className="w-fit h-fit bg-[#F6F6F6] px-3 py-[7px] rounded-full text-[#494A4C] text-xs">
            {wasteType}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 pt-4 flex items-center justify-end">
        <Button className="w-[97px] h-9 p-3 rounded-[20px] bg-[#228B22] font-dms_sans font-semibold text-sm text-white">
          Upload
        </Button>
      </CardFooter>
    </Card>
  )
}