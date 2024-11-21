import Image from "next/image";

export function ConfirmationStep() {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-xl font-semibold text-[#4CAF50]">Confirmation and Approval</h2>
       <Image src="/freepick.svg" alt="confirmation" className="mx-auto" width={200} height={200}/>
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