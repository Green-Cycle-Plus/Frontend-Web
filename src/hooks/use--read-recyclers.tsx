import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { config } from "@/config";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { readContract, writeContract } from "@wagmi/core";
import { useCallback } from "react";
import { useAccount } from "wagmi";

const useRecyclerInfo = (requestId: bigint) => {
	const account = useAccount();
	return useCallback(async () => {
		try {
			if (!account?.address) throw new Error("Please connect Wallet");
			const info = await readContract(config, {
				abi: WASTE_CONTRACT_ABI,
				address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
				functionName: "getRecyclerById",
				args: [requestId],
			});
			return info;
		} catch (error) {
			console.error("Error getting recycler info", error);
			throw new Error("Failed to get recycler info");
		}
	}, [requestId, account?.address]);
};

const useRecyclerRequests = (requestId: bigint) => {
	const account = useAccount();
	return useCallback(async () => {
		try {
			if (!account?.address) throw new Error("Please connect Wallet");
			const info = await readContract(config, {
				abi: WASTE_CONTRACT_ABI,
				address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
				functionName: "getRecyclerRequests",
				args: [requestId],
			});
			return info;
		} catch (error) {
			console.error("Error getting recycler requests", error);
			throw new Error("Failed to get recycler offers ");
		}
	}, [requestId, account?.address]);
};

const useAcceptRequest = (requestId: bigint, collectorId: `0x${string}`, price: bigint) => {
	const account = useAccount();
	return useCallback(async () => {
		try {
			if (!account?.address) throw new Error("Please connect Wallet");
			const info = await writeContract(config, {
				abi: WASTE_CONTRACT_ABI,
				address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
				functionName: "acceptRequest",
				args: [requestId, collectorId],
				value: price,
			});
			return info;
		} catch (error) {
			console.error("Error accepting request", error);
			throw new Error("Failed to accept request");
		}
	}, [requestId, collectorId, price, account?.address]);
};

const useGetRecyclerOffer = (recyclerAddress: `0x${string}`) => {
	const account = useAccount();
	return useCallback(async () => {
		try {
			if (!account?.address) throw new Error("Please connect Wallet");
			const info = await readContract(config, {
				abi: WASTE_CONTRACT_ABI,
				address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
				functionName: "recyclerOffers",
				args: [recyclerAddress],
			});
			return info;
		} catch (error) {
			console.error("Error getting recycler offers :", error);
			throw new Error("Failed to get recycler offers");
		}
	}, [recyclerAddress, account?.address]);
};

// function useAcceptRequest(requestId: bigint, collectorId: `0x${string}`) {
// 	const { data: hash, isPending, writeContract } = useWriteContract();
// 	const wagmiContractConfig = {
// 		abi: WASTE_MANAGEMENT_ABI,
// 		address: "0x1e5c761ef5BE9cf007596262F2A447D46e49d9aa" as `0x${string}`,
// 	};

// 	writeContract({
// 		...wagmiContractConfig,
// 		functionName: "acceptRequest",
// 		args: [requestId, collectorId],
// 	});

// 	return {
// 		hash,
// 		isPending,
// 	};
// }

export { useRecyclerInfo, useRecyclerRequests, useAcceptRequest, useGetRecyclerOffer };
