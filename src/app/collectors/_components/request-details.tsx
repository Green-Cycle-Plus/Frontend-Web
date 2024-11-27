"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { useEffect, useState } from "react";
import { getStatusColor, Request } from "./waste-requests";
// import { Button } from "@/components/ui/button";

// if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
//   throw new Error("GOOGLE_API_KEY is not defined");
// }

// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const defaultCenter = {
//   lat: 0,
//   lng: 0,
// };

export default function RequestDetails({ request }: { request: Request }) {
  // const [center, setCenter] = useState(defaultCenter);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [showMap, setShowMap] = useState(false);

  // const handleLoadMap = () => {
  //   setIsLoading(true);
  //   setError(null);

  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCenter({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //         setShowMap(true);
  //         setIsLoading(false);
  //       },
  //       (err) => {
  //         console.error("Error getting location:", err);
  //         setError("Unable to get your location. Using default map center.");
  //         setShowMap(true);
  //         setIsLoading(false);
  //       }
  //     );
  //   } else {
  //     setError(
  //       "Geolocation is not supported by your browser. Using default map center."
  //     );
  //     setShowMap(true);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleLoadMap();
  // }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="text-[#228B22] py-1.5 underline hover:bg-[#F5FFF9] cursor-pointer">
          details
        </span>
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
          <p className="opacity-70">{request.address}</p>
          <h3 className="font-semibold mt-4 mb-2">Waste Type</h3>
          <p className="opacity-70">{request.wasteType}</p>
          <h3 className="font-semibold mt-4 mb-2">Quantity</h3>
          <p className="opacity-70">{request.quantity}</p>
          <h3 className="font-semibold mt-4 mb-2">Status</h3>
          <Badge className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
        </div>
        <div>
          <p className="font-semibold">
            Get location and direction details below
          </p>

          <div>
            {/* {!showMap && (
              <Button variant="outline" onClick={handleLoadMap}>
                View Map
              </Button>
            )} */}
            {/* {isLoading && <p>Loading map please wait...</p>}
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
            )} */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
