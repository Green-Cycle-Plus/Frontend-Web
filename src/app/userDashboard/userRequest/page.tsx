"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RequestDataTable from "@/components/dashboard/requestTable";
import { useAccount } from "wagmi";
import { useUserRequests } from "@/hooks/use--read-recyclers";
import { Loader2 } from "lucide-react";
import { useGetUser } from "@/hooks/use-get-user";

type UserRequest = {
	wasteType: string;

	id: bigint;

	escrowRequestID: bigint;

	amountPaid: bigint;

	weight: number;

	valuedAt: bigint;

	offerId: number;

	longitude: number;

	latitude: number;

	userAddress: string;

	isCompleted: boolean;

	status: number;

	recyclerAddress: string;

	assignedCollector: string;

	isAccepted: boolean;

	location: string;
};
const Page = () => {
	const userRequests = useUserRequests();
	const [requests, setRequests] = useState<UserRequest[]>([]);
	const { address } = useAccount();
	const [loading, setloading] = useState(false);
	const getUser = useGetUser();

	const fetchUserRequest = async () => {
		setloading(true);
		try {
			const { userAddress } = await getUser();
			const userRequest = await userRequests(userAddress);
			setRequests([...userRequest]);

			setloading(false);
		} catch (error) {
			console.error("An error occured while initializing", error);

			setloading(false);
		}
	};

	useEffect(() => {
		fetchUserRequest();
	}, [address]);

	if (!address)
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<w3m-connect-button />
			</div>
		);
	if (loading)
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<Loader2 className="animate-spin h-10 w-10" />
			</div>
		);

	return (
		<div className="px-10">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-3xl font-bold mb-6 text-[#228B22]">Request</h1>
				<Image
					src="/filter.svg"
					alt="filter"
					width={30}
					height={30}
				/>
			</div>

			<div>
				<RequestDataTable requests={requests} />
			</div>
		</div>
	);
};

export default Page;
