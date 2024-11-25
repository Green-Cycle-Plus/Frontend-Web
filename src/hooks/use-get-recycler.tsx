import { useCallback } from "react";
import {  readContract } from "@wagmi/core";
import { config } from "@/config";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { useAccount } from "wagmi";
export const useReadRecyclers = () => {
    const account = useAccount()
   return useCallback(async() => {
    
        try {
            if(!account?.address) throw new Error("Please connect Wallet")
          const result = await readContract(config, {
            abi: WASTE_CONTRACT_ABI,
            address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "recyclers",
            args: [account.address as `0x${string}`],
          });
          return result;
        } catch (error) {
          console.error("Error getting recycler onchain:", error);
          throw new Error("Failed to get recycler onchain");
        }
  
   }, [account.address])
};