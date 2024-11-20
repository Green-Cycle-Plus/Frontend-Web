import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

export function ServiceSetupStep({useForm}:{useForm:  UseFormReturn<{
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
  }, any, undefined>}) {
    const { register, setValue, formState: { errors } } = useForm;
  
  
    const wasteTypes = [
      "Organic Waste",
      "Recyclable Materials",
      "Electronic Waste",
      "Hazardous Waste",
      "Construction Debris",
    ]
  
    return (
      <div className="space-y-6 font-dms_sans">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Service Setup</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wasteType">Waste Type</Label>
            <Select onValueChange={(value) => setValue("wasteType", value)}>
              <SelectTrigger id="wasteType">
                <SelectValue placeholder="Select Waste type" />
              </SelectTrigger>
              <SelectContent className="font-dms_sans">
                {wasteTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.wasteType && <p className="text-red-500">{errors.wasteType.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Collection Capacity</Label>
            <Input
              id="capacity"
              placeholder="Enter Capacity"
              {...register("capacity", { required: "Capacity is required" })}
            />
            {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
            <p className="text-sm text-muted-foreground text-right">Supported format: Kg</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalServices">
              Additional Services
              <span className="text-sm text-muted-foreground ml-1">(optional)</span>
            </Label>
            <Input
              id="additionalServices"
              placeholder="e.g. E-waste recycling, Hazardous material handling"
              {...register("additionalServices")}
            />
          </div>
        </div>
      </div>
    )
  }