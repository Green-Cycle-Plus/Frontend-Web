"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import RequestDataTable from "@/components/dashboard/requestTable";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useRecyclerRequests } from "@/hooks/use--read-recyclers";
import { useReadRecyclers } from "@/hooks/use-get-recycler";
import { Loader2 } from "lucide-react";

const Page = () => {
	const recyclerRequests = useRecyclerRequests();
	const [requests, setRequests] = useState(null || {});
	const { address } = useAccount();
	const [loading, setloading] = useState(false);
	const getRecycler = useReadRecyclers();

	const fetchRecycleRequest = async () => {
		setloading(true);
		try {
			const { id } = await getRecycler();

			const recyclerRequest = await recyclerRequests(id);
			setRequests(recyclerRequest);

			setloading(false);
		} catch (error) {
			console.error("An error occured while initializing", error);

			setloading(false);
		}
	};

	useEffect(() => {
		fetchRecycleRequest();
		// fetchRequests();
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
