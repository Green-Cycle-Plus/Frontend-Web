import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetContent,  SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRecyclerRequests, useAcceptRequest } from "@/hooks/use--read-recyclers";
import { getAddressFromLatLng } from "@/lib/utils";

interface DetailsProps {
	id: string;
	wasteType: string;
	quantity: number;
	latitude: number;
	longitude: number;
}

const Details = ({ id, wasteType, quantity, latitude, longitude }: DetailsProps) => {
	// const recyclerRequests = useRecyclerRequests(BigInt(1));
	const collectorId = "0x1e5c761ef5BE9cf007596262F2A447D46e49d9aa";
	// const address = await getAddressFromLatLng(latitude, longitude);
	const acceptRequest = useAcceptRequest(BigInt(id), collectorId);

	const [address, setAddress] = useState<string>("");

	useEffect(() => {
		getAddressFromLatLng(latitude, longitude).then((result) => setAddress(result));
	}, [latitude, longitude]);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<p className="text-sm underline text-brandGreen cursor-pointer">Details</p>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Request {id}</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4 space-y-3">
					<div className="space-y-3">

						<div className="space-y-2">
							<p>
								<span className="text-[#757575] mr-1">Location:</span>
								{address}
							</p>
							<p>
								<span className="text-[#757575]">Quantity:</span>
								{quantity}kg
							</p>
							<p className="text-[#757575]">
								Waste type: <Button className="rounded-full bg-[#228B22]">{wasteType}</Button>
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
							<Button
								type="submit"
								onClick={() => acceptRequest()}>
								Accept{" "}
							</Button>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Details;
