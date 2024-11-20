'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IoLocationOutline } from "react-icons/io5";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

if(!process.env.NEXT_PUBLIC_GOOGLE_API_KEY){
  throw new Error('GOOGLE_API_KEY is not defined')
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const mapContainerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: 0,
  lng: 0
}
export function CompanyInformationStep({useForm, selectedLocation, setSelectedLocation}:{useForm:  UseFormReturn<{
    companyName: string;
    registrationNumber: string;
    email: string;
    phoneNumber: string;
    location: string;
    wasteType: string;
    capacity: string;
    documents: any[];
    additionalServices?: string | undefined;
    logo: FileList;
  }, any, undefined>, 
selectedLocation: { lat: number; lng: number } | null,
setSelectedLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>
}) {
    const { register, formState: { errors } } = useForm;
    const [showMap, setShowMap] = useState(false)
 
    const [center, setCenter] = useState(defaultCenter)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLoadMap = () => {
      setIsLoading(true)
      setError(null)
  
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            setShowMap(true)
            setIsLoading(false)
          },
          (err) => {
            console.error("Error getting location:", err)
            setError("Unable to get your location. Using default map center.")
            setShowMap(true)
            setIsLoading(false)
          }
        )
      } else {
        setError("Geolocation is not supported by your browser. Using default map center.")
        setShowMap(true)
        setIsLoading(false)
      }
    }
  
    const handleMapClick = async(event:any) => {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
      if(selectedLocation){
      const address = await getAddressFromLatLng(selectedLocation.lat, selectedLocation.lng, );


    useForm.setValue('location', address)??""}
    }
    const getAddressFromLatLng = async (lat: number, lng: number) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  
      const response = await fetch(geocodeUrl);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return "Address not found";
    };

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#4CAF50] ">Company Information</h2>
        <div className="space-y-4">
        {showMap && (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker position={selectedLocation} />
            )}
          </GoogleMap>
        </LoadScript>
      )}
          <div className="space-y-2">

            <Label htmlFor="companyName" className="font-medium text-lg">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Enter Company name"
              {...register("companyName", { required: "Company name is required" })}
            />
            {errors.companyName && <p className="text-red-500">{errors?.companyName?.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber" className="font-medium text-lg">Registration Number</Label>
            <Input
              id="registrationNumber"
              placeholder="Enter Registration Number"
              {...register("registrationNumber", { required: "Registration number is required" })}
            />
            {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="font-medium text-lg">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                {...register("phoneNumber", { required: "Phone number is required" })}
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            </div>
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="location" className="font-medium text-lg">Location</Label>
            <Input
              id="location"
              placeholder="Enter Location"
              className=""
              {...register("location", { required: "Location is required" })}
            />
            <IoLocationOutline onClick={handleLoadMap} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"/>
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>
        </div>
      </div>
    )
  }