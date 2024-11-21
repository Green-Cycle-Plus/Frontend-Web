"use client";
import React from "react";
import Image from "next/image";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DataTableColumn from "@/components/dashboard/dataTable";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const page = () => {
	const data = {
		labels: ["Accepted", "Pending", "Rejected"],
		datasets: [
			{
				label: "Waste Status",
				data: [2500, 1500, 500],
				backgroundColor: ["#37D837", "#F3FF0E", "#FF0E0E"],
				hoverOffset: 4,
			},
		],
	};

	// const options = {
	// 	plugins: {
	// 		legend: {
	// 			position: "bottom",
	// 		},
	// 	},
	// };
	
	return (
		<div className="pb-5 px-10">
			<div className="flex w-full justify-between">
				<h1 className="text-4xl text-[#285528]">Overview</h1>
				<Image
					src="/filter.svg"
					alt="overview"
					width={20}
					height={20}
				/>
			</div>

			<div className="grid grid-cols-3 gap-4 mt-4">
				<DashboardCard
					description="Total Waste Processed"
					title="2500 Tons"
					image="/processed.svg"
					percent="29"
				/>
				<DashboardCard
					description="Month’s Revenue"
					title="$478,878.89"
					image="/revenue.svg"
					percent="59"
				/>
				<DashboardCard
					description="Active Collectors"
					title="478"
					image="/profile-2green.svg"
					percent="100"
				/>
			</div>

			<div className="grid grid-cols-5 gap-6 mt-8">
				<div className="col-span-3">
					<div className="flex w-full justify-between">
						<h1 className="text-xl ">Active Collection Request</h1>
						<Image
							src="/filter.svg"
							alt="overview"
							width={25}
							height={25}
						/>
					</div>
					<DataTableColumn />
				</div>
				<div className="col-span-2 mt-5">
					<div className="flex w-full justify-between pb-5">
						<h1 className="text-xl ">Chart</h1>
						<Image
							src="/filter.svg"
							alt="overview"
							width={20}
							height={20}
						/>
					</div>
					<Card>
						<CardHeader className="flex-row w-full justify-between">
							<CardDescription className="text-xl">Requests </CardDescription>

							<EllipsisVertical />
						</CardHeader>
						<CardContent>
							<Doughnut
								data={data}
								options={{
									plugins: {
										legend: {
											position: "bottom",
											labels: {
												boxWidth: 10,
											},
										},
									},
								}}
							/>{" "}
							{/* Add options here */}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default page;
