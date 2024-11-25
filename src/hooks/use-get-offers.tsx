import { useCallback } from "react";
import {  readContract } from "@wagmi/core";
import { config } from "@/config";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WAST_CONTRACT_ADDRESS } from "@/constants";
import { useAccount } from "wagmi";


export const useGetRecyclerOffers = () => {
    // const account = useAccount()
   return useCallback(async(recyclerId: bigint) => {
    
        try {
            // if(!account?.address) throw new Error("Please connect Wallet")
          const result = await readContract(config, {
            abi: WASTE_CONTRACT_ABI,
            address: WAST_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "getRecyclerOffers",
            args: [recyclerId],
          });
          return result;
        } catch (error) {
          console.error("Error getting recycler offers onchain:", error);
          throw new Error("Failed to get recycler offers onchain");
        }
  
   },[])
};