"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const requests = [
  {
    id: 1,
    address: "123 Green St",
    wasteType: "Plastic",
    quantity: "50kg",
    status: "Pending",
    urgency: "Low",
    lat: 4.789892,
    lng: 3.995342,
  },
  {
    id: 2,
    address: "456 Eco Ave",
    wasteType: "Paper",
    quantity: "30kg",
    status: "In Progress",
    urgency: "Medium",
    lat: 1.789892,
    lng: 2.995342,
  },
  {
    id: 3,
    address: "789 Recycle Rd",
    wasteType: "Metal",
    quantity: "100kg",
    status: "Pending",
    urgency: "High",
    lat: 3.789892,
    lng: 5.995342,
  },
  {
    id: 4,
    address: "321 Clean Ln",
    wasteType: "Glass",
    quantity: "40kg",
    status: "Completed",
    urgency: "Low",
    lat: 6.789892,
    lng: 2.995342,
  },
  {
    id: 5,
    address: "654 Sustain Blvd",
    wasteType: "Organic",
    quantity: "75kg",
    status: "Pending",
    urgency: "Medium",
    lat: 3.789892,
    lng: 6.995342,
  },
];

if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined");
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

export function WasteRequests() {
  const [openIssueId, setOpenIssueId] = useState<number | null>(null);
  const [center, setCenter] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const confirmRequest = (id: number) => {
    console.log(`Confirmed request ${id}`);
    toast.success("");
    // Here you would update the request status
  };

  const raiseIssue = (id: number, issue: string) => {
    console.log(`Raised issue for request ${id}: ${issue}`);
    // Here you would submit the issue to your backend
    setOpenIssueId(null);
  };

  const getStatusColor = (status: string) => {
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return "Address not found";
  };

  const handleLoadMap = () => {
    setIsLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowMap(true);
          setIsLoading(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Unable to get your location. Using default map center.");
          setShowMap(true);
          setIsLoading(false);
        }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Using default map center."
      );
      setShowMap(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadMap();
  }, [])

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Waste Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{getAddressFromLatLng(request.lat, request.lng) || request.address}</TableCell>
              <TableCell>{request.wasteType}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getUrgencyColor(request.urgency)}>
                  {request.urgency}
                </Badge>
              </TableCell>
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
                  <AlertDialog
                    open={openIssueId === request.id}
                    onOpenChange={(isOpen) =>
                      setOpenIssueId(isOpen ? request.id : null)
                    }
                  >
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Issue
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Raise an Issue</AlertDialogTitle>
                        <AlertDialogDescription>
                          Describe the issue you're facing with this waste
                          request.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <textarea
                        className="w-full p-2 border rounded"
                        placeholder="Describe the issue here..."
                        rows={4}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            raiseIssue(request.id, "Sample issue description")
                          }
                        >
                          Submit Issue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#228B22] text-[#228B22] hover:bg-[#F5FFF9]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Request Details</SheetTitle>
                        <SheetDescription>
                          Detailed information about the waste request.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <h3 className="font-semibold mb-2">Address</h3>
                        <p>{request.address}</p>
                        <h3 className="font-semibold mt-4 mb-2">Waste Type</h3>
                        <p>{request.wasteType}</p>
                        <h3 className="font-semibold mt-4 mb-2">Quantity</h3>
                        <p>{request.quantity}</p>
                        <h3 className="font-semibold mt-4 mb-2">Status</h3>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <h3 className="font-semibold mt-4 mb-2">Urgency</h3>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                      <div>
                        <p>Get location and direction details below</p>
                        <div>
                          {isLoading && <p>Loading map please wait...</p>}
                          {error && <p className="text-red-500">{error}</p>}
                          {showMap && (
                            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                              <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={16}
                                // onClick={handleMapClick}
                              >
                                  <Marker position={{ lat: request.lat, lng: request.lng }} />
                              </GoogleMap>
                            </LoadScript>
                          )}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
