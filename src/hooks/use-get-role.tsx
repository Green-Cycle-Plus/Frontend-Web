import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAccount, useReadContract } from "wagmi";

export const useGetRole = () => {
  const account = useAccount();
  // if (!account?.address) throw new Error("Please connect Wallet");
  const { data, isLoading, isError, error, refetch } = useReadContract({
    abi: WASTE_CONTRACT_ABI,
    address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getUserRole",
    args: [account.address as `0x${string}`],
  });

  useEffect(() => {
    refetch();
  }, [account]);
if(isError){
  toast.error("An error occured while feching user role")
  console.error(error.message);
}
  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
