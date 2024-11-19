import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import UploadImage from '../_components/UploadImage'  
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const UploadButton = () => {
  return (
    <div className='w-full'>
    <Dialog >
  <DialogTrigger className='py-2 px-4 bg-[#228B22] text-white rounded-3xl'>Upload</DialogTrigger>
  <DialogContent className='w-full'>
    <DialogHeader>
      <DialogTitle className='ml-5 text-sm'>Upload waste details</DialogTitle>
      <DialogDescription>
        <div>
          <UploadImage />
        </div>
        <div className='grid grid-cols-2 gap-5 mx-5 gap-y-5'>
          <div>
            <h1 className='text-black'>Waste type</h1>
          <Input />
          </div>
          <div>
          <h1 className='text-black'>Quantity</h1>
          <Input />
          <h1 className='text-xs flex justify-end'>Suported format: kg</h1>
          </div>
        <div>
          <h1 className='text-black'>Location</h1>
          <Input placeholder='Add Pickup Location'/>
        </div>

        <div>
          <h1 className='text-black'>Description</h1>
          <Input placeholder='(e.g., condition, special handling requirements)'/>
        </div>
        </div>
        <div className='flex justify-end gap-5 mt-5 mx-5'>
          <Button className='bg-white text-black'>Cancel</Button>
          <Button className='bg-[#228B22] text-white'>Upload</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default UploadButton
