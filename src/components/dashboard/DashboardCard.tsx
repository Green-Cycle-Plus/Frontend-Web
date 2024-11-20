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
			<CardHeader className="flex-row w-full justify-between">
				<CardDescription className="text-xl">{description} </CardDescription>
				<Image
					src={image}
					alt="overview"
					width={30}
					height={30}
				/>
			</CardHeader>
			<CardContent>
				<h3 className="text-3xl">{title}</h3>
			</CardContent>
			<CardFooter>
				<p className="flex gap-x-2 items-center">
					<span className="w-9 h-9 rounded-full bg-[#6ED196]/50 flex items-center justify-center">
						<ArrowUp className="w-5 h-5 text-[#6ED196]" />
					</span>
					<span className="text-[#228B22]">+{percent}%</span> from last month
				</p>
			</CardFooter>
		</Card>
	);
};

export default DashboardCard;
