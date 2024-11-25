import React, { useEffect, useState } from 'react'
import WasteRequestCard from './WasteRequestCard'
import { Button } from '@/components/ui/button'
import { WASTE_CONTRACT_ABI } from '@/abi/wasteContractAbi';
import { WASTE_CONTRACT_ADDRESS } from '@/constants';
import { config } from '@/config';
import { readContract } from '@wagmi/core'
import { run } from 'node:test';

export type Offer = {
  offerId: number;
  name: string;
  recyclerAddress: string;
  recyclerId: number;
  pricePerKg: number;
  minQuantity: number;
}

const WasteRequests = ({companyId}:{companyId?: string}) => {
  const [offers, setOffers] = useState<Offer[] | null>();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();

  async function fetchComapnyOffers(id: number) {
    const data = await readContract(config, {
      abi: WASTE_CONTRACT_ABI,
      address: WASTE_CONTRACT_ADDRESS,
      functionName: "getRecyclerOffers",
      args: [BigInt(id)],
    })

    console.log("Offers from contract", data);

    return data;
  }


  useEffect(() => {
    async function  run() {
      console.log("Company Id from requests section", companyId)
      if(companyId !== undefined && parseInt(companyId) >= 0) {
        setFetching(true);
        const offers = await fetchComapnyOffers(parseInt(companyId));
        console.log("Offers fetched", offers);
        setOffers(offers);
        setFetching(false);
      }
    }
    run();
  }, [])
  if(fetching) return <></>
  if (fetching) return <p className="p-10 text-gray-600">Loading...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;
  if (offers?.length === 0)
    return <p className="p-10 text-gray-600">No offers found for this company .</p>;



  return (
    <div className="w-full">
    <h4 className="text-[#121417] font-dms_sans font-semibold text-2xl mb-[37px]">Waste request </h4>
    <div className="flex flex-col lg:flex-row items-center gap-9">
      {offers?.map((offer, index) => (
        <WasteRequestCard price={100} quantity={10} location="Lagos" wasteType="Glass" wasteImg="/glass.svg" key={`offer-${index}`}/>
      ))}
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