import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadImage from "../_components/UploadImage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

import { IoLocationOutline } from "react-icons/io5";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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

const UploadButton = ({
  offerId,
  recyclerId,
}: {
  offerId: number;
  recyclerId: number;
}) => {
  const [showMap, setShowMap] = useState(false);
  const [lAddress, setLAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [center, setCenter] = useState(defaultCenter);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleMapClick = async (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setSelectedLocation({
      lat,
      lng,
    });

    const address = await getAddressFromLatLng(
      lat,
      lng
    );
    setLAddress(address);
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

  async function handleSubmit() {
    
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger className="py-2 px-4 bg-[#228B22] text-white rounded-3xl flex justify-end">
          Waste Pickup Request
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="ml-5 text-sm mt-2">
              <h1>Upload Waste details</h1>
            </DialogTitle>
            <DialogDescription>
              <div>
                <UploadImage />
              </div>
              <div className="grid grid-cols-2 gap-5 mx-5 gap-y-5">
                <div>
                  <h1 className="text-black">Quantity</h1>
                  <Input />
                  <h1 className="text-xs flex justify-end">
                    Suported format: kg
                  </h1>
                </div>
                <div>
                  <h1 className="text-black">Location</h1>
                  <div className="flex items-center">
                    <Input placeholder="Add Pickup Location" disabled value={lAddress} onChange={e => setLAddress(e.target.value)}/>
                    <IoLocationOutline
                      onClick={handleLoadMap}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  {isLoading && <p>Loading map...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {showMap && (
                    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={16}
                        onClick={handleMapClick}
                      >
                        {selectedLocation && (
                          <Marker position={selectedLocation} />
                        )}
                      </GoogleMap>
                    </LoadScript>
                  )}
                </div>

                <div>
                  <h1 className="text-black">Description</h1>
                  <Input placeholder="(e.g., condition, special handling requirements)" />
                </div>
              </div>
              <div className="flex justify-between gap-5 mt-5 mx-5">
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help center
                </button>
                <div className="space-x-5">
                  <Button className="bg-white text-black">Cancel</Button>
                  <Button className="bg-[#228B22] text-white">Upload</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadButton;
