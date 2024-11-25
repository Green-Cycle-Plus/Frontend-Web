import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { config } from "@/config";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { readContract } from "@wagmi/core";
import { useCallback } from "react";
import { useAccount } from "wagmi";


export const useGetRecyclerCollectors = () => {
    const account = useAccount()
   return useCallback(async() => {
    
        try {
            if(!account?.address) throw new Error("Please connect Wallet")
          const result = await readContract(config, {
            abi: WASTE_CONTRACT_ABI,
            address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "getRecyclerCollectors",
            args: [account.address],
          });
          return result;
        } catch (error) {
          console.error("Error getting recycler offers onchain:", error);
          throw new Error("Failed to get recycler offers onchain");
        }
  
   },[account.address])
};