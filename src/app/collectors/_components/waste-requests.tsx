"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import RequestDetails from "./request-details";
import RaiseIssueDialog from "./raise-issue-dialog";

const requests = [
  {
    id: 1,
    address: "123 Green St",
    wasteType: "Plastic",
    quantity: 50,
    status: "Pending",
    urgency: "Low",
    lat: 4.789892,
    lng: 3.995342,
  },
  {
    id: 2,
    address: "456 Eco Ave",
    wasteType: "Paper",
    quantity: 30,
    status: "In Progress",
    urgency: "Medium",
    lat: 4.789892,
    lng: 3.995342,
  },
  {
    id: 3,
    address: "789 Recycle Rd",
    wasteType: "Metal",
    quantity: 100,
    status: "Pending",
    urgency: "High",
    lat: 6.789892,
    lng: 4.355342,
  },
  {
    id: 4,
    address: "321 Clean Ln",
    wasteType: "Glass",
    quantity: 40,
    status: "Completed",
    urgency: "Low",
    lat: 6.789892,
    lng: 2.995342,
  },
  {
    id: 5,
    address: "654 Sustain Blvd",
    wasteType: "Organic",
    quantity: 75,
    status: "Pending",
    urgency: "Medium",
    lat: 3.789892,
    lng: 6.295342,
  },
];

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export type Request = {
  id: number;
  address: string;
  wasteType: string;
  quantity: number;
  status: string;
  urgency: string;
  lat: number;
  lng: number;
};

export default function WasteRequests() {
  const confirmRequest = (id: number) => {
    console.log(`Confirmed request ${id}`);
    toast.success(`Confirmed request ${id}`);
    // Here you would update the request status
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Waste Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {request.address}
              </TableCell>
              <TableCell>{request.wasteType}</TableCell>
              <TableCell>{request.quantity} kg</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-6">
                  <RequestDetails request={request} />
                  <Button
                    size="sm"
                    onClick={() => confirmRequest(request.id)}
                    className="bg-[#228B22] hover:bg-[#1a6b1a] text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirm
                  </Button>
                  <RaiseIssueDialog request={request} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
