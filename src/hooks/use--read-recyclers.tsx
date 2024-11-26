import { useReadContract, useWriteContract } from "wagmi";
import { WASTE_MANAGEMENT_ABI } from "../abi/wasteManagementAbi";
import { request } from "http";

function useRecyclerInfo() {
	const wagmiContractConfig = {
		abi: WASTE_MANAGEMENT_ABI,
		address: "0x1e5c761ef5BE9cf007596262F2A447D46e49d9aa" as `0x${string}`,
	};

	const { data: info } = useReadContract({
		...wagmiContractConfig,
		functionName: "getRecyclerById",
		args: [BigInt(1)],
	});

	return {
		info,
	};
}

function useRecyclerRequests() {
	const wagmiContractConfig = {
		abi: WASTE_MANAGEMENT_ABI,
		address: "0x1e5c761ef5BE9cf007596262F2A447D46e49d9aa" as `0x${string}`,
	};

	const { data: requests } = useReadContract({
		...wagmiContractConfig,
		functionName: "getRecyclerRequests",
		args: [BigInt(1)],
	});

	return {
		requests,
	};
}

function useAcceptRequest(requestId: bigint, collectorId: `0x${string}`) {
	const { data: hash, isPending, writeContract } = useWriteContract();
	const wagmiContractConfig = {
		abi: WASTE_MANAGEMENT_ABI,
		address: "0x1e5c761ef5BE9cf007596262F2A447D46e49d9aa" as `0x${string}`,
	};

	writeContract({
		...wagmiContractConfig,
		functionName: "acceptRequest",
		args: [requestId, collectorId],
	});

	return {
		hash,
		isPending,
	};
}
export { useRecyclerInfo, useRecyclerRequests, useAcceptRequest, };
