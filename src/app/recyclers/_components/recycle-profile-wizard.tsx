"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircle } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"
import { CompanyInformationStep } from "./CompanyInformationStep"
import { ServiceSetupStep } from "./ServiceSetupStep"
import { UploadDocumentStep } from "./UploadDocumentStep"

const companyInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
})

const serviceSetupSchema = z.object({
  wasteType: z.string().min(1, "Please select a waste type"),
  capacity: z.string().min(1, "Capacity is required"),
  additionalServices: z.string().optional(),
})

const fileSchema = z.custom<File>((file) => {
  if (!(file instanceof File)) return false; 
  const validTypes = ["image/png", "image/jpeg"]; 
  const maxSizeInBytes = 5 * 1024 * 1024; // Max file size: 5MB
  console.log(file)
  return validTypes.includes(file.type) && file.size <= maxSizeInBytes;
}, {
  message: "File must be a valid image (PNG or JPEG) and not exceed 5MB",
});

const uploadDocumentSchema = z.object({
  logo: fileSchema,
  documents: z.array(z.any()).min(1, "At least one document is required").max(5, "Maximum 5 documents allowed"),
})

const formSchema = companyInfoSchema.merge(serviceSetupSchema).merge(uploadDocumentSchema)
const steps = ["Company Information", "Service Setup", "Upload Document", "Confirmation"]

export default function CompanyProfileWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
mode:"onChange"
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Form submitted", data)
      // Here you would typically send the data to your backend
    }
  }

  const handleNextStep = async () => {
    let isValid = false
    switch (currentStep) {
      case 0:
        isValid = await methods.trigger(Object.keys(companyInfoSchema.shape) as any)
        break
      case 1:
        isValid = await methods.trigger(Object.keys(serviceSetupSchema.shape) as any)
        break
      case 2:
        isValid = await methods.trigger(Object.keys(uploadDocumentSchema.shape) as any)
        break
      default:
        isValid = true
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        methods.handleSubmit(onSubmit)()
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto font-dms_sans">
          <CardContent className="p-6">
            {currentStep === 0 && <CompanyInformationStep useForm={methods} />}
            {currentStep === 1 && <ServiceSetupStep useForm={methods} />}
            {currentStep === 2 && <UploadDocumentStep useForm={methods} />}
            {currentStep === 3 && <ConfirmationStep  />}
          </CardContent>
          <CardFooter className="p-6 flex items-center justify-between">
            <Link 
              href="#" 
              className="flex items-center text-sm text-muted-foreground hover:underline"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help center
            </Link>
            <div className="space-x-2">
            {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
            <Button type="button" onClick={handleNextStep} className="bg-black text-white hover:bg-black/90">
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}







function ConfirmationStep() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-semibold text-[#4CAF50]">Confirmation and Approval</h2>
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-32 mx-auto"
      >
        <path
          d="M20 60L80 90L180 30"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M40 30h120v60H40z"
          fill="#4CAF50"
          fillOpacity="0.2"
        />
        <path
          d="M40 30l60 30 60-30"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M160 90l-60-30-60 30"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="100"
          x2="30"
          y2="100"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="110"
          x2="25"
          y2="110"
          stroke="#4CAF50"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-1">
        <h3 className="text-lg font-medium">
          Your account has been submitted for approval.
        </h3>
        <p className="text-sm text-muted-foreground">
          Approval takes up to 24 hours.
        </p>
      </div>
    </div>
  )
}