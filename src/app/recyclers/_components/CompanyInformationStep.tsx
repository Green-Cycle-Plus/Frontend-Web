import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { UseFormReturn } from "react-hook-form";

export function CompanyInformationStep({useForm}:{useForm:  UseFormReturn<{
    companyName: string;
    registrationNumber: string;
    email: string;
    phoneNumber: string;
    location: string;
    wasteType: string;
    capacity: string;
    documents: any[];
    additionalServices?: string | undefined;
    logo: File;
  }, any, undefined>}) {
    const { register, formState: { errors } } = useForm;
  
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#4CAF50] ">Company Information</h2>
        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="location" className="font-medium text-lg">Location</Label>
            <Input
              id="location"
              placeholder="Enter Location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>
        </div>
      </div>
    )
  }