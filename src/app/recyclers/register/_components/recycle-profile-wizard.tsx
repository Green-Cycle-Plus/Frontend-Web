"use client";

import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { config } from "@/config";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { toast } from "sonner";

import { UploadDocumets } from "@/lib/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import {
  FileText,
  FolderUp,
  HelpCircle,
  LucideProps,
  // Router,
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
import { WasteType } from "../page";
import { useRouter } from "next/navigation";

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
    title: "Step 4",
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
  min_weight: z.string().min(1, "Min weight is required"),
  amount: z.string().min(1, "Amount is required"),
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
  documents: z.custom<File[]>(
    (file: FileList) => {
      if (!file) return false;
      const maxSizeInBytes = 5 * 1024 * 1024; // Max file size: 5MB
      const isValidSize = file.length > 0 && file[0].size <= maxSizeInBytes;
      return isValidSize;
    },
    {
      message: "Upload at least one document and document must not exceed 5MB",
    }
  ),
});

const formSchema = companyInfoSchema
  .merge(serviceSetupSchema)
  .merge(uploadDocumentSchema);
export default function CompanyProfileWizard({
  wasteTypes,
}: {
  wasteTypes: WasteType[];
}) {
  const account = useAccount();
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepId, setCurrentStepId] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const updateStepStatus = (stepId: number, newStatus: StepStatus) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, status: newStatus } : step
      )
    );
  };
  const methods = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
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
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createRecycler",
        args: [
          address as `0x${string}`,
          data.location,
          parseInt(selectedLocation!.lat.toString()),
          parseInt(selectedLocation!.lng.toString()),
        ],
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      if (transactionReceipt.status === "success") {
        toast.success("Recycler profile created successfully");
        return transactionReceipt.transactionHash;
      }
    } catch (error) {
      console.error("Error creating recycler onchain:", error);
      toast.error("Failed to create recycler onchain");
      throw new Error("Failed to create recycler onchain");
    }
  };

  const getRecycler = async (address: string) => {
    try {
      const result = await readContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "recyclers",
        args: [address as `0x${string}`],
      });
      return result;
    } catch (error) {
      console.error("Error getting recycler onchain:", error);
      toast.error("Failed to get recycler onchain");
      throw new Error("Failed to get recycler onchain");
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (!account.address) {
        toast.error("Wallet not connected");
        throw new Error("Wallet not connected");
      }
      if (!selectedLocation) {
        toast.error(
          "Location not selected, please select a location using the map"
        );
        throw new Error(
          "Location not selected, please select a location using the map"
        );
      }
      await createRecyclerOnchain(data, account.address);
      const recyclerOnchain = await getRecycler(account.address);
      console.log({ recyclerOnchain });
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
        companyId: Number(recyclerOnchain[0].toString()),
        companyName: data.companyName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        physicalAddress: data.location,
        lat: selectedLocation.lat,
        lon: selectedLocation.lng,
        licenseNumber: data.registrationNumber,
        licenseDocument: documeUpload?.url,
        companyLogo: logoUpload?.url,
        wasteTypeId: data.wasteType,
        min_weight: Number(data.min_weight),
        amount: Number(data.amount),
        description: data.additionalServices,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/create`,
        payload,
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
          },
        }
      );

      console.log("final response", response);
      goToNextStep();
    } catch (error) {
      console.error("An errror occured: ", error);
      toast.error("Can't create recycler, please try again");
    } finally {
      setLoading(false);
    }
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
      } else if (currentStepId === steps.length - 1) {
        methods.handleSubmit(onSubmit)();
      } else {
        router.push("/dashboard");
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
        return <ServiceSetupStep wasteTypes={wasteTypes} useForm={methods} />;
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
                  {currentStepId > 1 && currentStepId < steps.length && (
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
                    className="bg-black w-fit text-white hover:bg-black/90"
                  >
                    {loading
                      ? "Loading..."
                      : currentStepId === steps.length - 1
                      ? "Submit"
                      : currentStepId === steps.length
                      ? "Go to dashboard"
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
