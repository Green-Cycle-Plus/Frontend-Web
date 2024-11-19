import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

export function UploadDocumentStep({useForm}:{useForm:  UseFormReturn<{
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
  
    const { register, setValue, watch, formState: { errors } } = useForm;
    const logo = watch("logo")

    const isEmptyLogo = logo?.name === undefined

    const documents = watch("documents")

  
    const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      console.log({file})
      if (file && file.type.startsWith('image/')) {
        setValue("logo", file)
      }
    }
  
    const handleDocumentDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      if (files.length + (documents?.length || 0) <= 5) {
        setValue("documents", [...(documents || []), ...files])
      }
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Upload Document</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Company Logo</label>
            <div
              className="mt-2 relative h-[200px] max-w-[275px] border-2 border-dashed border-[#4CAF50] rounded-lg bg-[#4CAF50]/5"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleLogoDrop}
            >
              <input
                type="file"
                // accept="image/*"
                className="sr-only"
                id="logo-upload"
                {...register("logo")}
              />
              <label
                htmlFor="logo-upload"
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                {!isEmptyLogo ? (
                  <Image
                    src={URL.createObjectURL(logo)}
                    alt="Company logo preview"
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                    <Image width={0} height={0} src="/gallery.svg" alt="Upload icon" className="w-6 h-6 text-white" />
                  </div>
                )}
              </label>
            </div>
            {errors.logo && <p className="text-red-500">{errors.logo?.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">License Document</label>
            <div
              className="mt-2 relative h-[200px] border-2 border-dashed rounded-lg bg-muted/5"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDocumentDrop}
            >
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                className="sr-only"
                id="document-upload"
                multiple
                {...register("documents", { required: "At least one document is required" })}
              />
              <label
                htmlFor="document-upload"
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
              >
                 <Image width={0} height={0} src="/upload.svg" alt="Upload icon" className="w-6 h-6 text-white" />
                <span className="text-sm text-muted-foreground">
                  Drag & drop or click to choose files
                </span>
                {documents && documents.length > 0 && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {documents.length} file(s) selected
                  </div>
                )}
              </label>
            </div>
            {errors.documents && <p className="text-red-500">{errors.documents.message}</p>}
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Supported format: JPEG, PNG, PDF, WORD</span>
              <span>Max(2-5)</span>
            </div>
          </div>
        </div>
      </div>
    )
  }