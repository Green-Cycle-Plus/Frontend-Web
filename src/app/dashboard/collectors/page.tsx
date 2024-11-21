'use client'

import * as React from 'react'
import { BadgeCheck, Plus, Trash2, UserCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { generateAbbreviation } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'

const collectors = [
    {
        id: 455,
        image: '',
        name: 'Bola Ahmed',
        contact: '+234 813 334 5569',
        totalWasteCollected: 5000,
        completedCollections: 246,
    },
    {
        id: 555,
        image: '',
        name: 'Shola Dapo',
        contact: '+234 913 554 5729',
        totalWasteCollected: 3500,
        completedCollections: 126,
    },
    {
        id: 456,
        image: '',
        name: 'Shawn Obi',
        contact: '+233 805 742 2238',
        totalWasteCollected: 2000,
        completedCollections: 56,
    },
]

export default function CollectorsPage()  {
  const [isOpen, setIsOpen] = React.useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
    // Here you would typically send the data to your backend
    setIsOpen(false)
    reset()
  }

  return (
    <div className="px-8 bg-[#F5FFF9] min-h-screen">
      <div className='flex items-center justify-between mb-8'>
        <h1 className="text-2xl font-bold text-[#228B22]">Collectors</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button><Plus className='w-4 h-4 mr-0.5'/> Add Collector</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Collector</DialogTitle>
              <DialogDescription>
                Enter the details of the new collector here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-sm col-start-2 col-span-3">{`${errors.name.message}`}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    className="col-span-3"
                    {...register("contact", { required: "Contact is required" })}
                  />
                  {errors.contact && <p className="text-red-500 text-sm col-start-2 col-span-3">{`${errors.contact.message}`}</p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    className="col-span-3"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && <p className="text-red-500 text-sm col-start-2 col-span-3">{`${errors.address.message}`}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Save Collector</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex items-center gap-10 flex-wrap'>
        {collectors.map(collector => (
            <Card className="max-w-md bg-white shadow-md md:min-w-[420px]" key={collector.id}>
                <CardHeader className="flex gap-4 p-4">
                <div className='flex items-center justify-between'>
                    <Avatar className="w-14 h-14 mr-2">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt={`${collector.name}`} />
                        <AvatarFallback>{generateAbbreviation(collector?.name || "Anonymous User")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-1">
                            <h2 className="text-lg leading-tight font-semibold">{collector?.name}</h2>
                            <BadgeCheck className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-500 leading-tight">Collector</p>
                        <div className="flex items-center">
                            <span className="text-yellow-500 leading-tight">★★★★★</span>
                        </div>
                    </div>
                    <span className="ml-auto text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">Available</span>
                </div>
                </CardHeader>
                <CardContent className="p-4 text-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span className=''>Contact:</span>
                        <span className='font-bold'>+2348063562785</span>
                    </div>
                    <p className="mt-2 text-sm">
                        Total waste collected: <span className="font-bold">{collector?.totalWasteCollected} kg</span>
                    </p>
                    <p className="text-sm">
                        Completed collections: <span className="font-bold">{collector?.completedCollections}</span>
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                    <Button variant="outline" className="bg-white text-red-500 hover:text-red-600"> 
                        <Trash2 className="w-4 h-4 mr-0.5" />
                        Remove
                    </Button>
                    <Button variant="default" className="bg-black text-white">
                        <UserCheck className="w-4 h-4 mr-0.5" />
                        Assign
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  )
}