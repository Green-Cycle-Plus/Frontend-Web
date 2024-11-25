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
import { HelpCircle, Loader2 } from "lucide-react";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { IoLocationOutline } from "react-icons/io5";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { config } from "@/config";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { toast } from "sonner";
import { parseUnits } from "viem";

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
  pricePerKg,
}: {
  offerId: number;
  recyclerId: number;
  pricePerKg: number;
}) => {
  const [showMap, setShowMap] = useState(false);
  const [lAddress, setLAddress] = useState("");
  const [weight, setWeight] = useState<number | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const address = await getAddressFromLatLng(lat, lng);
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
    if (!weight || !selectedLocation || !offerId || !recyclerId)
      return toast.error("Missing fields, please fill in all fields...");

    try {
      setSubmitting(true);
      const price = pricePerKg * weight;
      const makeRequestTxHash = await writeContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS,
        functionName: "makeRequest",
        args: [
          BigInt(recyclerId),
          BigInt(offerId),
          BigInt(weight),
          BigInt(price),
          Number(parseUnits(`${selectedLocation.lat}`, 7)),
          Number(parseUnits(`${selectedLocation.lng}`, 7)),
        ],
      });

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: makeRequestTxHash,
      });

      if (transactionReceipt.status === "success") {
        toast.success("Waste pickup request made succesfully");
        setIsDialogOpen(false);
        setSubmitting(false);
        return;
      } else if (transactionReceipt.status === "reverted") {
        setSubmitting(false);
        return toast.error(
          "Waste pickup request was not completed successfully, transaction was reverted..."
        );
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

  return (
    <div className="w-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="py-2 px-4 bg-[#228B22] text-white rounded-3xl flex justify-end text-sm">
          Request pickup
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl max-h-[646px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-lg">
              <h1>Upload Waste details</h1>
            </DialogTitle>
            <DialogDescription>
              <div>
                <UploadImage />
              </div>
              <div className="space-y-5">
                <div>
                  <h1 className="text-black">Quantity in weight</h1>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                  />
                  <h1 className="text-xs flex justify-end">
                    Suported format: kg
                  </h1>
                </div>
                <div>
                  <h1 className="text-black">Location</h1>
                  <div>
                    <Input
                      placeholder="Add Pickup Location"
                      disabled
                      value={lAddress}
                      onChange={(e) => setLAddress(e.target.value)}
                      rightIcon={
                        <IoLocationOutline
                          onClick={handleLoadMap}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                        />
                      }
                    />
                  </div>
                </div>
                <div>
                  {isLoading && <p>Loading map please wait...</p>}
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
              <div className="flex justify-between gap-5 mt-5">
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help center
                </button>
                <div className="space-x-5">
                  <Button
                    className="bg-white text-black"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#228B22] hover:bg-[#228B22]/80 text-white"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        Making Request{" "}
                        <Loader2 className="animate-spin w-3 h-3" />
                      </span>
                    ) : (
                      "Make Request"
                    )}
                  </Button>
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
