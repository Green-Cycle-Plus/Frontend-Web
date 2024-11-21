"use client";
import React from "react";
// import Image from "next/image";
import DashboardCard from "@/components/dashboard/DashboardCard";
// import DataTableColumn from "@/components/dashboard/dataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";

import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AnalyticsPage() {
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

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Total Waste',
            data: [1500, 1200, 1800, 900, 1600, 2000, 2200, 1800, 1500, 1900],
            backgroundColor: '#228B22',
          },
          {
            label: 'Revenue',
            data: [1200, 1000, 1500, 800, 1400, 1800, 2000, 1600, 1300, 1700],
            backgroundColor: '#497E5D',
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }

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
				<h1 className="text-2xl font-bold text-[#285528]">Analytics</h1>
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
                    <Card className="w-full" style={{ height: "515px" }}>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Total Waste vs Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <Bar data={barData} options={options} height={350}/>
                        </CardContent>
                    </Card>
				</div>
				<div className="col-span-2">
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