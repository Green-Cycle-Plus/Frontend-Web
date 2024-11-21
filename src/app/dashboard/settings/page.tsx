'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  return (
    <div className="px-8 pb-10 bg-[#F5FFF9] min-h-screen">
      <h1 className="text-2xl font-semibold text-[#228B22] mb-6">Settings</h1>
      <div className="space-y-8 max-w-[600px]">
        <section>
          <div className='flex items-center justify-between'>
            <h2 className="text-lg font-semibold text-[#228B22] mb-4">Profile</h2>
            <span className='text-[#228B22] underline test-sm capitalize cursor-pointer'>edit</span>
          </div>
          <div className="flex items-center">
            <Avatar className="w-24 h-24 bg-[#228B22]">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </section>

        <section>
          <div className='flex items-center justify-between'>
            <h2 className="text-lg font-semibold text-[#228B22] mb-4">Company Information</h2>
            <span className='text-[#228B22] underline test-sm capitalize cursor-pointer'>edit</span>
          </div>
          <div className="space-y-4">
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Company Name</Label>
              <Input placeholder="Company Name" />
            </div>
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Registration Number</Label>
              <Input placeholder="Registration Number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className=''>
                <Label className="text-sm font-bold mb-2 block">Email</Label>
                <Input placeholder="Email" />
              </div>
              <div className=''>
                <Label className="text-sm font-bold mb-2 block">Phone Number</Label>
                <Input placeholder="Phone Number" />
              </div>
            </div>
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Location</Label>
              <Textarea placeholder="Location" className='bg-white'/>
            </div>
          </div>
        </section>

        <section>
          <div className='flex items-center justify-between'>
            <h2 className="text-lg font-semibold text-[#228B22] mb-4">Service setup</h2>
            <span className='text-[#228B22] underline test-sm capitalize cursor-pointer'>edit</span>
          </div>
          <div className="space-y-4">
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Waste Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Waste Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Collection Capacity</Label>
              <Input placeholder="Collection Capacity" />
            </div>
            <div className=''>
              <Label className="text-sm font-bold mb-2 block">Additional Services(optional)</Label>
              <Textarea placeholder="Additional Services (e.g., waste recycling, hazardous material handling)" className='bg-white'/>
            </div>
          </div>
        </section>

        <section className='max-w-[400px]'>
          <h2 className="text-lg font-semibold text-[#228B22] mb-4">Notification</h2>
          <div className="space-y-2 ">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
              <Label className="text-sm font-medium">Request Updates</Label>
              <Switch defaultChecked className="data-[state=checked]:bg-[#228B22]"/>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
              <Label className="text-sm font-medium">Offers</Label>
              <Switch className="data-[state=checked]:bg-[#228B22]"/>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
              <Label className="text-sm font-medium">News</Label>
              <Switch className="data-[state=checked]:bg-[#228B22]"/>
            </div>
          </div>
        </section>
        <div className='w-full items-center justify-center'>
          <Button variant="destructive" className="max-w-[400px] w-full bg-red-100 hover:bg-red-200 text-red-600">
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}