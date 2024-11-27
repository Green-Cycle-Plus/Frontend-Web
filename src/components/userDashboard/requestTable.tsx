"use client";
import React from "react";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Details from "../userDashboard/Details";

type Request = {
	id: string;
	type: string;
	quantity: number;
	location: string;
	status: "Accepted" | "Pending" | "Rejected";
};

type BlockRequest = {
	id: number;

	type: string;

	location: string;

	userAddress: string;

	recyclerAddress: string;

	offerId: number;

	weight: number;

	valuedAt: number;

	amountPaid: number;

	isCompleted: boolean;

	isAccepted: boolean;

	assignedCollector: string;

	escrowRequestID: number;

	status: number;
};

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

export const columns: ColumnDef<BlockRequest>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "weight",
		header: "Quantity",
	},
	{
		accessorKey: "location",
		header: "Location",
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
				<div className="text-sm space-x-3">
					{row.original.status === 0 && (
						<Button
							className="text-red-500"
							variant={"outline"}>
							Cancel
						</Button>
					)}
				</div>
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
					type={row.original.type || "Plastic"}
					quantity={row.original.weight}
					location={row.original.location || "Lagos"}
					status={row.original.status === 0 ? "Pending" : row.original.status === 1 ? "Accepted" : row.original.status === 2 ? "Completed" : "Cancelled"}
				/>
			);
		},
	},
];

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
