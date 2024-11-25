import React, { useEffect, useState } from "react";
import WasteRequestCard from "./WasteRequestCard";
import { Button } from "@/components/ui/button";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { config } from "@/config";
import { readContract } from "@wagmi/core";
import { getWasteImageUrl } from "@/lib/utils";

export type Offer = {
  offerId: number;
  name: string;
  recyclerAddress: string;
  recyclerId: number;
  pricePerKg: number;
  minQuantity: number;
};

const WasteRequests = ({ companyId }: { companyId?: string }) => {
  const [offers, setOffers] = useState<Offer[] | null>();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  async function fetchCompanyOffers(id: number) {
    const data = await readContract(config, {
      abi: WASTE_CONTRACT_ABI,
      address: WASTE_CONTRACT_ADDRESS,
      functionName: "getRecyclerOffers",
      args: [BigInt(id)],
    });

    console.log("Offers from contract", data);

    return data;
  }

  useEffect(() => {
    async function run() {
      console.log("Company Id from requests section", companyId);
      if (companyId !== undefined && parseInt(companyId) >= 0) {
        try {
          
          setFetching(true);
          const fetchedOffers = await fetchCompanyOffers(parseInt(companyId));
          console.log("Offers fetched", offers);
  
          // Transform the readonly array into a mutable Offer array
          const mutableOffers = fetchedOffers.map((offer) => ({
            offerId: Number(offer.offerId), // Convert bigint to number
            name: offer.name,
            recyclerAddress: offer.recyclerAddress,
            recyclerId: Number(offer.recyclerId), // Convert bigint to number
            pricePerKg: Number(offer.pricePerKg), // Convert bigint to number
            minQuantity: Number(offer.minQuantity), // Convert bigint to number
          }));

          setOffers(mutableOffers);
          
        } catch (error) {
          setError(`An error occured fetching company offers ${error}`);
        } finally {
          setFetching(false);
        }
      }
    }
    run();
  }, []);

  if (fetching) return <p className="p-10 text-gray-600">Fetching offers...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;
  if (offers?.length === 0)
    return (
      <p className="p-10 text-gray-600">No offers found for this company .</p>
    );

  return (
    <div className="w-full">
      <h4 className="text-[#121417] font-dms_sans font-semibold text-2xl mb-[37px]">
        Waste request offers{" "}
      </h4>
      <div className="flex flex-col lg:flex-row items-center gap-9">
        {offers?.map((offer, index) => (
          <WasteRequestCard
            price={offer.pricePerKg}
            quantity={offer.minQuantity}
            location="Lagos"
            wasteType={offer.name}
            wasteImg={getWasteImageUrl(offer.name)}
            offerId={offer.offerId}
            recyclerId={parseInt(companyId!)}
            key={`offer-${index}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-start gap-2 font-dms_sans mt-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          {"<"}
        </Button>
        <Button
          variant="default"
          size="icon"
          className="bg-brandGreen rounded-full hover:bg-[#4CAF50]/90"
        >
          1
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          2
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          3
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          4
        </Button>
        <span>...</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          12
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default WasteRequests;
