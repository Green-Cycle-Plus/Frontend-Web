import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const Details = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{/* <Button variant="outline">Open</Button> */}
				<p className="text-sm underline text-brandGreen cursor-pointer">Details</p>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Request 01</SheetTitle>
					{/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
				</SheetHeader>
				<div className="grid gap-4 py-4 space-y-3">
					<div className="space-y-3">
						<h3 className="text-[#707070] ">Description</h3>
						<p className="text-sm">Lorem ipsum dolor sit amet consectetur. Morbi quis lorem massa sem platea auctor id molestie elit. Orci eget purus vitae volutpat eget lacus augue donec bibendum. Nunc a lacinia fames nunc tempus volutpat laoreet at ut. Non tellus ultrices orci ut.Lorem ipsum dolor sit amet consectetur. Morbi quis lorem massa sem platea auctor id molestie elit. Orci eget purus vitae volutpat eget lacus augue donec bibendum. Nunc a lacinia fames nunc tempus volutpat laoreet at ut. Non tellus ultrices orci ut.</p>

						<div className="space-y-2">
							<p>
								<span className="text-[#757575] mr-1">Location:</span>Abuja
							</p>
							<p>
								<span className="text-[#757575]">Quantity:</span> 50kg
							</p>
							<p className="text-[#757575]">
								Waste type: <Button className="rounded-full bg-[#228B22]">Cardboard</Button>
							</p>
						</div>
					</div>
					<div className="space-y-2">
						<h3>Images</h3>
						<div className="flex gap-2">
							<Image
								src="/plastic.png"
								alt="glass"
								width={"150"}
								height={"150"}
								className="z-30"
							/>
							<Image
								src="/glassBottles.png"
								alt="glass"
								width={"150"}
								height={"150"}
								className="-ml-16 z-10"
							/>
							<p className=" w-full h-full inline-flex items-center justify-center text-[#818181]">+3</p>
						</div>
					</div>
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
								variant={"outline"}
								className="text-red-500">
								Reject
							</Button>
							<Button type="submit">Accept </Button>
						</div>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							type="submit"
							className="w-full h-[66px] bg-[#497E5D]">
							Assign a collector
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Details;
