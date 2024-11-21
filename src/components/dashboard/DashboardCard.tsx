"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface DashboardCardProps {
	description: string;
	image: string;
	title: string;
	percent: string;
}
const DashboardCard = ({ description, image, title, percent }: DashboardCardProps) => {
	return (
		<Card>
			<CardHeader className="flex-row w-full justify-between mb-0">
				<CardDescription className="text-xl">{description} </CardDescription>
				<Image
					src={image}
					alt="overview"
					width={30}
					height={30}
				/>
			</CardHeader>
			<CardContent className="my-0">
				<h3 className="text-4xl font-bold">{title}</h3>
			</CardContent>
			<CardFooter className="mt-0">
				<p className="flex gap-x-2 items-center">
					<span className="w-7 h-7 rounded-full bg-[#6ED196]/20 flex items-center justify-center">
						<ArrowUp className="w-4 h-4 text-[#6ED196]" />
					</span>
					<span className="text-[#228B22]">+{percent}%</span> from last month
				</p>
			</CardFooter>
		</Card>
	);
};

export default DashboardCard;
