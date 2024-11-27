import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { config } from "@/config";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { multicall, readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export function useCollectorRequests(address: `0x${string}`) {
  if (!address) toast.error("Wallet not connected, please connect wallet!");

  const getCollectorRequestsIds = async () => {
    try {
      const result = await readContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getAllCollectorRequests",
      });
      return result;
    } catch (error) {
      toast.error(`Error fetching owned collector requests: ${error}`);
    }
  };

  const getCollectorRequests = async () => {
    const requestIds = (await getCollectorRequestsIds()) as [];
    if (requestIds.length > 0) {
      const contractsData: any[] = requestIds.map((id) => ({
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "showRequest",
        args: [id],
      }));

      const requests = await multicall(config, {
        contracts: contractsData,
      });
      console.log("Requests from hook", requests);
      return requests;
    }
    return [];
  };

  const confirmRequest = async () => {};

  return { getCollectorRequests, confirmRequest };
};
