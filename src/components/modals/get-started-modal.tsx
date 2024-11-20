'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'

export function GetStartedModal({ label } : { label?: string }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-[#228B22] text-white p-[12.8px] py-7 rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors ${label == "white" && 'border border-white text-white p-[12.8px]  rounded-[24px] font-semibold text-base font-dms_sans hover:border-gray-300 transition-colors'}`}>
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-dms_sans">
        <DialogHeader>
          <DialogTitle>Get Started with GreenCycle+</DialogTitle>
          <DialogDescription>
            Choose how you&apos;d like to proceed with our recycling platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 items-center">
          <div className='flex w-full itemse-center justify-center'>
            {isConnected ? (
                <Button
                    className="w-full bg-[#228B22] text-white font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors"
                    onClick={() => {
                        setOpen(false);
                        router.push('/companyPage');
                        // Add navigation logic here
                        console.log("Navigating to app...")
                    }}
                >
                    Continue as user
                </Button> 
              ) : <w3m-connect-button/>
            }
          </div>
          <Button
            variant="outline"
            className="border-[#497E5D] text-[#497E5D] hover:bg-[#F5FFF9]"
            onClick={() => {
              setOpen(false);
              router.push('/recyclers/register');
              // Add registration logic here
              console.log("Opening recycler registration...")
            }}
          >
            Register as a Recycler
          </Button>
        </div>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}