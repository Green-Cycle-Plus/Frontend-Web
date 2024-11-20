import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const page = () => {
	return (
		<div className="px-10">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-3xl font-bold mb-6 text-[#228B22]">Offers</h1>
				{/* <Button>
					Add <Plus />
				</Button> */}
				<Dialog>
					<DialogTrigger asChild>
						<Button>
							Add <Plus />
						</Button>
					</DialogTrigger>
					<DialogContent className="w-full">
						<DialogHeader>
							<DialogTitle>Add new Offer</DialogTitle>
							{/* <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription> */}
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-4">
								<Label
									htmlFor="title"
									className="">
									Title
								</Label>
								<Input
									id="name"
									defaultValue="Pedro Duarte"
									className="col-span-3"
								/>
							</div>

							<div className="flex w-full items-center gap-4">
								<div className="grid gap-4 w-full">
									<Label
										htmlFor="wasteType"
										className="">
										Waste Type
									</Label>
									<Input
										id="wasteType"
										defaultValue=""
										className="col-span-3 w-full"
										placeholder="Enter price"
									/>
								</div>

								<div className="grid gap-4 mt-4 w-full">
									<Label
										htmlFor="quantity"
										className="">
										Quantity
									</Label>
									<Input
										id="quantity"
										defaultValue="120"
										className="col-span-3 w-full"
										placeholder="Enter price"
									/>
									<p className="text-xs text-gray-400 text-right -mt-4">Supported format: Kg</p>
								</div>
							</div>

							<div className="grid gap-4">
								<Label
									htmlFor="price"
									className="">
									Price
								</Label>
								<Input
									id="price"
									defaultValue=""
									className="col-span-3"
									placeholder="Enter price"
								/>
							</div>

							<div className="grid gap-4">
								<Label
									htmlFor="location"
									className="">
									Location
								</Label>
								<Input
									id="location"
									defaultValue=""
									className="col-span-3"
									placeholder="Add Pickup location"
								/>
							</div>
						</div>
						<DialogFooter>
							<div className="w-full flex justify-between">
								<div className="inline-flex items-center gap-2">
									<Image
										src={"/help-circle.svg"}
										alt="help"
										width={20}
										height={20}
									/>
									<p className="text-[#6F6F6F] text-sm">Help center</p>
								</div>
								<div className="space-x-2">
									<Button
										type="submit"
										variant={"outline"}>
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-[#228B22]">
										Upload{" "}
									</Button>
								</div>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="flex-row w-full justify-between">
						<CardTitle>500kg Of Glass</CardTitle>
						{/* <CardDescription className="text-xl">Requests </CardDescription> */}

						<EllipsisVertical />
					</CardHeader>
					<CardContent>
						<p>
							<span className="text-[#757575]">Price:</span> 10,000 tokens
						</p>
						<p>
							<span className="text-[#757575]">Location:</span>Lagos
						</p>
						<p>
							<span className="text-[#757575]">Quantity:</span> 500kg
						</p>
					</CardContent>

					<CardFooter className="flex w-full justify-between">
						<p className="text-[#757575]">
							Waste type: <Button className="rounded-full bg-[#228B22]">Glass</Button>
						</p>
						<Button
							variant={"outline"}
							className="text-red-500 py-2">
							Remove
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader className="flex-row w-full justify-between">
						<CardTitle>50kg Of Cardboard</CardTitle>
						{/* <CardDescription className="text-xl">Requests </CardDescription> */}

						<EllipsisVertical />
					</CardHeader>
					<CardContent>
						<p>
							<span className="text-[#757575]">Price:</span> 2,000 tokens
						</p>
						<p>
							<span className="text-[#757575]">Location:</span>Abuja
						</p>
						<p>
							<span className="text-[#757575]">Quantity:</span> 50kg
						</p>
					</CardContent>

					<CardFooter className="flex w-full justify-between">
						<p className="text-[#757575]">
							Waste type: <Button className="rounded-full bg-[#228B22]">Cardboard</Button>
						</p>
						<Button
							variant={"outline"}
							className="text-red-500 py-2">
							Remove
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default page;
