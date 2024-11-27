"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Details from "./Details";
import { getAddressFromLatLng } from "@/lib/utils";

import { useAcceptRequest } from "@/hooks/use--read-recyclers";
// import { useGetRecyclerOffer } from "@/hooks/use--read-recyclers";
const collectorId = "0x580626a35D4DAb957c800F2e9e3e853D2E94D010";

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

// type BlockRequest = {
// 	id: number;

// 	wasteType: string;

// 	location: string;

// 	userAddress: string;

// 	recyclerAddress: string;

// 	offerId: number;

// 	weight: number;

// 	valuedAt: number;

// 	amountPaid: number;

// 	isCompleted: boolean;

// 	isAccepted: boolean;

// 	assignedCollector: string;

// 	escrowRequestID: number;

// 	status: number;
// };

// export const requests: Request[] = [
// 	{
// 		id: "01",
// 		type: "plastics",
// 		quantity: 120,
// 		location: "Wuse, Abuja",
// 		status: "Pending",
// 	},
// 	{
// 		id: "02",
// 		type: "glass",
// 		quantity: 400,
// 		location: "Jabi, Abuja",
// 		status: "Accepted",
// 	},
// 	{
// 		id: "03",
// 		type: "Paper",
// 		quantity: 50,
// 		location: "Lugbe, Abuja",
// 		status: "Rejected",
// 	},
// ];

function ActionButtons({ id, valueAt }: { id: number; valueAt: bigint }) {
	const acceptRequest = useAcceptRequest(BigInt(id), collectorId, valueAt);
	return (
		<div className="text-sm space-x-3">
			<Button
				className="text-red-500"
				variant={"outline"}>
				Reject
			</Button>
			<Button onClick={() => acceptRequest()}>Accept</Button>
		</div>
	);
}

// function LocationCell({ lat, lng }: { lat: number; lng: number }) {
// 	const [address, setAddress] = useState<string>("");

// 	useEffect(() => {
// 		getAddressFromLatLng(lat, lng).then((result) => setAddress(result));
// 	}, [lat, lng]);

// 	return <div>{address || "Loading..."}</div>;
// }

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
