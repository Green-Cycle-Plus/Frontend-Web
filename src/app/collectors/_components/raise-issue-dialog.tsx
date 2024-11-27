import React, { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Request } from "./waste-requests";

function RaiseIssueDialog({ request }: { request: Request }) {
	const [openIssueId, setOpenIssueId] = useState<number | null>(null);

	const confirmRequest = (id: number) => {
		console.log(`Confirmed request ${id}`);
		toast.success(`Confirmed request ${id}`);
		// Here you would update the request status
	};

	const raiseIssue = (id: number, issue: string) => {
		console.log(`Raised issue for request ${id}: ${issue}`);
		// Here you would submit the issue to your backend
		setOpenIssueId(null);
	};

	return (
		<AlertDialog
			open={openIssueId === request.id}
			onOpenChange={(isOpen: boolean) => setOpenIssueId(isOpen ? request.id : null)}>
			<AlertDialogTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					className="border-red-500 text-red-500 hover:bg-red-50">
					<AlertTriangle className="w-4 h-4 mr-1" />
					Issue
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Raise an Issue</AlertDialogTitle>
					<AlertDialogDescription>Describe the issue you're facing with this waste request.</AlertDialogDescription>
				</AlertDialogHeader>
				<textarea
					className="w-full p-2 border rounded"
					placeholder="Describe the issue here..."
					rows={4}
				/>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => raiseIssue(request.id, "Sample issue description")}>Submit Issue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default RaiseIssueDialog;
