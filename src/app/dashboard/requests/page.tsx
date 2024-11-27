"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RequestDataTable from "@/components/dashboard/requestTable";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useRecyclerInfo, useRecyclerRequests } from "@/hooks/use--read-recyclers";

const Page = () => {
	const recyclerRequests = useRecyclerRequests(BigInt(1));
	const [requests, setRequests] = useState(null || {});
	const { address } = useAccount();

	// const { info: recyclerInfo } = useRecyclerInfo();

	useEffect(() => {
		const fetchRequests = async () => {
			const result = await recyclerRequests();
			setRequests(result);
			// console.log("send result", result);
		};
		fetchRequests();
	}, [recyclerRequests]);

	const serializeInfo = (data) => {
		// Convert BigInt to string for serialization
		return JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value));
	};

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
				<Button
					onClick={() => {
						setRequests(recyclerRequests);
					}}>
					Request Recycler
				</Button>{" "}
				{/* Update to set info */}
			</div>
			{requests && <div>{serializeInfo(requests)}</div>}
			{/* Display the info if it exists */}
			<div>
				<RequestDataTable requests={requests} />
			</div>
		</div>
	);
};

export default Page;
