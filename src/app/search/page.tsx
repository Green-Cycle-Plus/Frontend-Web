"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const page = () => {
	return (
		<div className="w-[80%] mx-auto bg-[#F8FFF8]">
			<p className="font-medium">
				<span className="text-[#717274]">
					Home <span className="px-4">/</span>{" "}
				</span>
				Search Results
			</p>
			<div className="flex w-full justify-between py-16">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold">Companies</h1>
					<div className=" flex">
						<Button className="bg-[#68AE80] p-6">
							<Image
								src="/filter.svg"
								alt="google"
								width={20}
								height={20}
							/>{" "}
							Filters
							<span className="w-4 h-4 rounded-full bg-white text-black p-3 flex items-center justify-center">2</span>
						</Button>

						<div className="flex items-center">
							<Separator
								orientation="vertical"
								className="mx-3 h-1/2 "
							/>
						</div>
						<div className="">
							<Input
								className=" rounded-lg border-[#228B22] w-[500px] bg-[#F8FFF8]"
								leftIcon={<Search color="#717680" />}
								placeholder="Search for anything..."
								rightIcon={<Button className="bg-[#228B22] text-white text-sm border border-border px-5 py-[1px] placeholder:text-[#717680] w-full max-w-[400px]">Search</Button>}
							/>
						</div>
					</div>
					<div className="space-x-4">
						<Button
							className="bg-[#F7FFF7] text-[#717274] border border-[#68AE80] p-5 text-lg"
							variant={"outline"}>
							Plastics <X style={{ width: "24px", height: "24px" }} />
						</Button>

						<Button
							className="bg-[#F7FFF7] text-[#717274] border border-[#68AE80] p-5 text-lg"
							variant={"outline"}>
							Metals <X style={{ width: "24px", height: "24px" }} />
						</Button>

						<Button
							className="bg-[#F7FFF7] text-[#717274] border border-[#68AE80] p-5 text-lg"
							variant={"outline"}>
							Cans <X style={{ width: "24px", height: "24px" }} />
						</Button>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<p>Sort by:</p>
					<Select>
						<SelectTrigger className=" bg-[#F6F6F6] w-[100px]">
							<SelectValue placeholder="Default" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default page;
