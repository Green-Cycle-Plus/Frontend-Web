import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { WasteType } from "../../page";

export function ServiceSetupStep({useForm, wasteTypes}:{useForm:  UseFormReturn<{
    companyName: string;
    registrationNumber: string;
    email: string;
    phoneNumber: string;
    location: string;
    wasteType: string;
    capacity: string;
    documents: File[];
    amount:string,
    min_weight: string;
    additionalServices?: string | undefined;
    logo: FileList;
  }, any, undefined>, wasteTypes: WasteType[]}) {
    const { register, setValue, formState: { errors } } = useForm;
  
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
                {wasteTypes?.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.name}
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
            <Label htmlFor="min_weight">Min Weight (Kg)</Label>
            <Input
              id="capacity"
              placeholder="10"
              {...register("min_weight", { required: "Min Weight is required" })}
            />
            {errors.min_weight && <p className="text-red-500">{errors.min_weight.message}</p>}
            <p className="text-sm text-muted-foreground text-right">Supported format: Kg</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount In Ether</Label>
            <Input
              id="amount"
              placeholder="10"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            <p className="text-sm text-muted-foreground text-right">Supported format: ETH</p>
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