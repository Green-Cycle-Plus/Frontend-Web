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

export default function WasteRequests({requests}:{requests: Request[]}) {
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
