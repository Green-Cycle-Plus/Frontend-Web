'use client'

import * as React from 'react'
import { ChevronRight, HelpCircle, MapPin, Shield, Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const steps = [
  'Company Information',
  'Recycling Capabilities',
  'Documentation',
  'Wallet Setup'
]

const businessTypes = [
  'Recycling Center',
  'Waste Collection',
  'Material Recovery',
  'E-Waste Processing'
]

const wasteTypes = [
  { id: 'plastic', label: 'Plastic' },
  { id: 'paper', label: 'Paper' },
  { id: 'metal', label: 'Metal' },
  { id: 'glass', label: 'Glass' },
  { id: 'e-waste', label: 'E-Waste' },
  { id: 'organic', label: 'Organic Waste' }
]

export default function CompanyProfileWizard() {
  const [step, setStep] = React.useState(0)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm({
    defaultValues: {
      companyName: '',
      registrationNumber: '',
      email: '',
      phone: '',
      businessType: '',
      location: '',
      wasteTypes: [],
      equipment: '',
      processingCapabilities: '',
      serviceRadius: '',
      documents: [],
      walletType: 'single',
      twoFactorEnabled: false
    }
  })

  const onSubmit = async (data: unknown) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsSubmitting(false)
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6 font-mono">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</div>
          <div className="text-sm text-muted-foreground">{steps[step]}</div>
        </div>
        <Progress value={((step + 1) / steps.length) * 100} className="h-2 bg-emerald-100" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step]}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Enter location" {...field} />
                            <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="wasteTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Waste Types Accepted</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          {wasteTypes.map((type) => (
                            <FormField
                              key={type.id}
                              control={form.control}
                              name="wasteTypes"
                              render={({  }) => {
                                return (
                                  <FormItem
                                    key={type.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      {/* <Checkbox
                                        checked={field.value?.includes(type.id))}
                                        onCheckedChange={(checked: any) => {
                                          return checked
                                            ? field.onChange([...field.value, type.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value: string) => value !== type.id
                                                )
                                              )
                                        }}
                                      /> */}
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {type.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment Inventory</FormLabel>
                        <FormControl>
                          <Input placeholder="List your specialized equipment" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="processingCapabilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Processing Capabilities</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe your processing capabilities" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceRadius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Radius (km)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter service radius" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Button variant="outline">Upload Documents</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Drag and drop your documents here or click to browse
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-light">Business License</p>
                          <p className="text-sm text-muted-foreground">PDF or image file</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-light">Environmental Certification</p>
                          <p className="text-sm text-muted-foreground">PDF or image file</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="walletType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Wallet Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="single" id="single" />
                              <Label htmlFor="single">Single Owner Wallet</Label>
                            </div>
                            <div className="flex items-center space-x-3 space-y-0">
                              <RadioGroupItem value="multi" id="multi" />
                              <Label htmlFor="multi">Multi-Signature Wallet</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-light">Security Key</p>
                          <p className="text-sm text-muted-foreground">Set up your security key</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="twoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Two-factor Authentication</FormLabel>
                            <FormDescription>
                              Add an extra layer of security to your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <CardFooter className="flex justify-between px-0 pb-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  Previous
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            'Saving...'
                          ) : step === steps.length - 1 ? (
                            'Complete'
                          ) : (
                            <>
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="icon">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Need help? Click for more information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}