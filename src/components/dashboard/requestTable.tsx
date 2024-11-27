"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Details from "./Details";
import { getAddressFromLatLng } from "@/lib/utils";
import { Loader } from "lucide-react";

import { toast } from "sonner";

import { useAcceptRequest, useGetRecyclerCollectors } from "@/hooks/use--read-recyclers";

function useAddress(lat: number, lng: number) {
	const [address, setAddress] = useState<string>("");

	useEffect(() => {
		getAddressFromLatLng(lat, lng).then((result) => setAddress(result));
	}, [lat, lng]);

	return address;
}

type BlockRequest = {
	wasteType: string;
	id: number;
	escrowRequestID: string;
	amountPaid: string;
	weight: number;
	valuedAt: string;
	offerId: number;
	longitude: number;
	latitude: number;
	userAddress: string;
	isCompleted: boolean;
	status: number;
	recyclerAddress: string;
	assignedCollector: string;
	isAccepted: boolean;
	totalWasteRequest: string;
	totalAmountSpent: string;
	totalWasteCollectedInKgs: "0";
};

interface Collector {
	id: bigint;

	name: string;

	collectorAddress: string;

	contact: string;

	numberOfWasteCollected: bigint;

	isAvailable: boolean;
}

function ActionButtons({ status, id, valueAt }: { status: number; id: number; valueAt: bigint }) {
	const recycleCollectors = useGetRecyclerCollectors();

	const [collectorsF, setCollectorsF] = useState<Collector[]>([]);
	const [selectedCollector, setSelectedCollector] = useState<string | null>(null);

	const acceptRequest = useAcceptRequest(BigInt(id), selectedCollector as `0x${string}`, valueAt);
	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit() {
		// if (!weight || !selectedLocation || !offerId || !recyclerId) return toast.error("Missing fields, please fill in all fields...");

		try {
			setSubmitting(true);
			const hash = await acceptRequest();

			const transactionReceipt = await waitForTransactionReceipt(config, {
				hash: hash,
			});

			if (transactionReceipt.status === "success") {
				toast.success("Request created successfully");
				// setIsDialogOpen(false);
				setSubmitting(false);
				return;
			} else if (transactionReceipt.status === "reverted") {
				setSubmitting(false);
				return toast.error("Request creation was not completed successfully, transaction was reverted...");
			} else {
				setSubmitting(false);
				return toast.error("An unexpected error occured!");
			}
		} catch (error) {
			setSubmitting(false);
			console.log(`An unexpected error occured! ${error}`);
			return toast.error(`An unexpected error occured! ${error}`);
		} finally {
			setSubmitting(false);
		}
	}

	useEffect(() => {
		const fetchCollectors = async () => {
			const result = await recycleCollectors();
			setCollectorsF([...result]);
			// console.log("send result", result);
		};
		fetchCollectors();
	}, [recycleCollectors]);
	return (
		<div className="text-sm space-x-3">
			<Button
				className="text-red-500"
				variant={"outline"}>
				Reject
			</Button>

			{status !== 1 && (
				<Dialog>
					<DialogTrigger asChild>
						<Button>Accept</Button>
					</DialogTrigger>
					<DialogContent className="w-full">
						<DialogHeader>
							<DialogTitle>Choose a Collector</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4 w-full">
							<Select
								// value={selectedCollector}
								onValueChange={(address) => setSelectedCollector(address)}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Assign a collector" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Collectors</SelectLabel>
										{collectorsF?.map((collector) => {
											console.log(collector);
											return (
												<SelectItem
													key={collector.id}
													value={collector.collectorAddress}>
													{collector.name}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<DialogFooter>
							<Button
								onClick={handleSubmit}
								disabled={submitting}>
								{submitting ? (
									<span className="flex items-center">
										Selecting Collector <Loader className="animate-spin w-3 h-3" />
									</span>
								) : (
									" Select Collector"
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}

function LocationCell({ lat, lng }: { lat: number; lng: number }) {
	const address = useAddress(lat, lng);
	return <div>{address || "Loading..."}</div>;
}

export const columns: ColumnDef<BlockRequest>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			return <div>{row.original.wasteType}</div>;
		},
	},
	{
		accessorKey: "weight",
		header: "Quantity",
	},
	{
		accessorKey: "location",
		header: "Location",
		cell: ({ row }) => {
			return (
				<LocationCell
					lat={row.original.latitude}
					lng={row.original.longitude}
				/>
				// <div>key</div>
			);
		},
	},
	{
		accessorKey: "Status",
		header: () => <div className="text-left">Status</div>,
		cell: ({ row }) => {
			return (
				<div className="text-sm">
					{row.original.status === 0 && <div className="flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full px-3 py-1 w-max">Pending</div>}

					{row.original.status === 1 && <div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full px-3 py-1 w-max">Accepted</div>}

					{row.original.status === 2 && <div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full px-3 py-1 w-max">Completed</div>}

					{row.original.status === 3 && <div className="flex items-center justify-center bg-red-100 text-red-600 rounded-full px-3 py-1 w-max">Cancelled</div>}
				</div>
			);
		},
	},
	{
		accessorKey: "Actions",
		header: () => <div className="text-left">Actions</div>,
		cell: ({ row }) => {
			return (
				<ActionButtons
					id={row.original.id}
					valueAt={BigInt(row.original.valuedAt)}
					status={row.original.status}
				/>
			);
		},
	},
	{
		accessorKey: "details",
		header: () => <div className="text-left"></div>,
		cell: ({ row }) => {
			return (
				<Details
					id={row.original.id.toString()}
					wasteType={row.original.wasteType || "Plastic"} //type={row.original.wasteType || "Plastic"}
					quantity={row.original.weight}
					latitude={row.original.latitude}
					longitude={row.original.longitude}
				/>
			);
		},
	},
];

// const dataTable = () => {
// 	return <div>dataTable</div>;
// };

// export default dataTable;

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default function RequestDataTable({ requests }: { requests: BlockRequest[] }) {
	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={requests}
			/>
		</div>
	);
}
