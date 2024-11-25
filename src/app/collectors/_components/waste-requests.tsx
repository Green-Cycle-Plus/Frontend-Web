'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CheckCircle, AlertTriangle } from 'lucide-react'

const requests = [
  { id: 1, address: "123 Green St", wasteType: "Plastic", quantity: "50kg", status: "Pending" },
  { id: 2, address: "456 Eco Ave", wasteType: "Paper", quantity: "30kg", status: "Pending" },
  { id: 3, address: "789 Recycle Rd", wasteType: "Metal", quantity: "100kg", status: "Pending" },
  { id: 4, address: "321 Clean Ln", wasteType: "Glass", quantity: "40kg", status: "Pending" },
  { id: 5, address: "654 Sustain Blvd", wasteType: "Organic", quantity: "75kg", status: "Pending" },
]

export function WasteRequests() {
  const [openIssueId, setOpenIssueId] = React.useState<number | null>(null)

  const confirmRequest = (id: number) => {
    console.log(`Confirmed request ${id}`)
    // Here you would update the request status
  }

  const raiseIssue = (id: number, issue: string) => {
    console.log(`Raised issue for request ${id}: ${issue}`)
    // Here you would submit the issue to your backend
    setOpenIssueId(null)
  }

  return (
    <div>
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
              <TableCell>{request.address}</TableCell>
              <TableCell>{request.wasteType}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => confirmRequest(request.id)}
                    className="bg-[#228B22] hover:bg-[#1a6b1a] text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirm
                  </Button>
                  <AlertDialog open={openIssueId === request.id} onOpenChange={(isOpen) => setOpenIssueId(isOpen ? request.id : null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#228B22] text-[#228B22] hover:bg-[#F5FFF9]"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Issue
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Raise an Issue</AlertDialogTitle>
                        <AlertDialogDescription>
                          Describe the issue you're facing with this waste request.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <textarea
                        className="w-full p-2 border rounded"
                        placeholder="Describe the issue here..."
                        rows={4}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => raiseIssue(request.id, "Sample issue description")}>
                          Submit Issue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}