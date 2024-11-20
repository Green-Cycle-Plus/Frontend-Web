"use client";

import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { config } from "@/config";
import { WAST_CONTRACT_ADDRESS } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { UploadDocumets } from "@/lib/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { readContract, writeContract } from "@wagmi/core";
import {
  FileText,
  FolderUp,
  HelpCircle,
  LucideProps,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import * as z from "zod";
import { StepSidebar } from "./step-sidebar";
import { CompanyInformationStep } from "./steps/CompanyInformationStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { ServiceSetupStep } from "./steps/ServiceSetupStep";
import { UploadDocumentStep } from "./steps/UploadDocumentStep";
import axios from "axios";
export type StepStatus = "completed" | "current" | "pending";

export interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  status: StepStatus;
}

const initialSteps: Step[] = [
  {
    id: 1,
    title: "Step 1",
    subtitle: "Company Information",
    icon: User,
    status: "current",
  },
  {
    id: 2,
    title: "Step 2",
    subtitle: "Service Setup",
    icon: FileText,
    status: "pending",
  },
  {
    id: 3,
    title: "Step 3",
    subtitle: "Upload Documents",
    icon: FolderUp,
    status: "pending",
  },
  {
    id: 4,
    title: "Step 3",
    subtitle: "Confirmation and Approval",
    icon: ShieldCheck,
    status: "pending",
  },
];

const companyInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
});

const serviceSetupSchema = z.object({
  wasteType: z.string().min(1, "Please select a waste type"),
  capacity: z.string().min(1, "Capacity is required"),
  additionalServices: z.string().optional(),
});

const fileSchema = z.custom<FileList>(
  (file: FileList) => {
    if (!file) return false;
    const validTypes = ["image/png", "image/jpeg"];
    const maxSizeInBytes = 5 * 1024 * 1024; // Max file size: 5MB
    const isValidType =
      validTypes.includes(file[0]?.type) && file[0]?.size <= maxSizeInBytes;
    return isValidType;
  },
  {
    message: "File must be a valid image (PNG or JPEG) and not exceed 5MB",
  }
);

const uploadDocumentSchema = z.object({
  logo: fileSchema,
  documents: z
    .array(z.any())
    .min(1, "At least one document is required")
    .max(5, "Maximum 5 documents allowed"),
});

const formSchema = companyInfoSchema
  .merge(serviceSetupSchema)
  .merge(uploadDocumentSchema);

export default function CompanyProfileWizard() {
  const account = useAccount();
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepId, setCurrentStepId] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const updateStepStatus = (stepId: number, newStatus: StepStatus) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, status: newStatus } : step
      )
    );
  };
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const goToNextStep = () => {
    if (currentStepId < steps.length) {
      updateStepStatus(currentStepId, "completed");
      setCurrentStepId(currentStepId + 1);
      updateStepStatus(currentStepId + 1, "current");
    }
  };

  const goToPreviousStep = () => {
    if (currentStepId > 1) {
      updateStepStatus(currentStepId, "pending");
      setCurrentStepId(currentStepId - 1);
      updateStepStatus(currentStepId - 1, "current");
    }
  };

  const createRecyclerOnchain = async (
    data: z.infer<typeof formSchema>,
    address: string
  ) => {
    try {
      const result = await writeContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WAST_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createRecycler",
        args: [
          address as `0x${string}`,
          data.location,
          parseInt(selectedLocation!.lat.toString()),
          parseInt(selectedLocation!.lng.toString()),
        ],
      });
      return result;
    } catch (error) {
      console.error("Error creating recycler onchain:", error);
      throw new Error("Failed to create recycler onchain");
    }
  };

  const getRecycler = async (address: string) => {
    try {
      const result = await readContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WAST_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "recyclers",
        args: [address as `0x${string}`],
      });
      return result;
    } catch (error) {
      console.error("Error getting recycler onchain:", error);
      throw new Error("Failed to get recycler onchain");
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (!account.address) {
        throw new Error("Wallet not connected");
      }
      if (!selectedLocation)
        throw new Error(
          "Location not selected, please select a location using the map"
        );
      await createRecyclerOnchain(data, account.address);
      const recyclerOnchain = await getRecycler(account.address);
      const companyLogo = new FormData();
      companyLogo.append("file", data.logo[0]);
      companyLogo.append("upload_preset", "company_logos");
      const documents = new FormData();
      for (let i = 0; i < data.documents.length; i++) {
        documents.append("file", data.documents[i]);
        documents.append("upload_preset", "documents");
      }
      const logoUpload = await UploadDocumets({ formData: companyLogo });
      const documeUpload = await UploadDocumets({ formData: documents });

      const payload = {
        "companyId": Number(recyclerOnchain[0].toString()),
        "companyName": data.companyName,
        "email": data.email,
        "phoneNumber": data.phoneNumber,
        "physicalAddress": data.location,
        "lat": selectedLocation.lat,
        "lon": selectedLocation.lng,
        "licenseNumber": data.registrationNumber,
        "licenseDocument": documeUpload?.url,
        "companyLogo": logoUpload?.url,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/create`,
        payload,
        {
          method: "POST",
          headers: {
            "x-api-key":
              "c144fca11d1c9453d319eb71a823fca1a6facffa9b534cd6b825c36e57346c40",
          },
        }
      );
      
     
      console.log("final response", response);
    } catch (error) {
      console.error("An errror occured: ", error);
      toast({
        title: "An error occured",
        description: "Can't create recycler, please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

    // if (currentStep < steps.length - 1) {
    //   setCurrentStep(currentStep + 1)
    // } else {

    // Here you would typically send the data to your backend
    // }
  };

  const handleNextStep = async () => {
    let isValid = false;
    switch (currentStepId) {
      case 1:
        isValid = await methods.trigger(
          Object.keys(companyInfoSchema.shape) as any
        );
        break;
      case 2:
        isValid = await methods.trigger(
          Object.keys(serviceSetupSchema.shape) as any
        );
        break;
      case 3:
        isValid = await methods.trigger(
          Object.keys(uploadDocumentSchema.shape) as any
        );
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (currentStepId < steps.length - 1) {
        goToNextStep();
      } else {
        methods.handleSubmit(onSubmit)();
      }
    }
  };

  const renderCurrentStep = () => {
    switch (currentStepId) {
      case 1:
        return (
          <CompanyInformationStep
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            useForm={methods}
          />
        );
      case 2:
        return <ServiceSetupStep useForm={methods} />;
      case 3:
        return <UploadDocumentStep useForm={methods} />;
      case 4:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };
  return (
    <div className="flex min-h-screen bg-[#F5FFF9] font-dms_sans">
      <StepSidebar steps={steps} currentStepId={currentStepId} />
      <div className="flex-1 p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card className="w-full max-w-2xl mx-auto font-dms_sans">
              <CardContent className="p-6">{renderCurrentStep()}</CardContent>
              <CardFooter className="p-6 flex items-center justify-between">
                <Link
                  href="#"
                  className="flex items-center text-sm text-muted-foreground hover:underline"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help center
                </Link>
                <div className="space-x-2">
                  {currentStepId > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={loading}
                    className="bg-black text-white hover:bg-black/90"
                  >
                    {loading
                      ? "Loading..."
                      : currentStepId === steps.length - 1
                      ? "Submit"
                      : "Next"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
