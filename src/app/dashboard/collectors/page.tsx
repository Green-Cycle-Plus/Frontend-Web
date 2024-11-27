"use client";

import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { useGetRecyclerCollectors } from "@/hooks/use-get-collectors";
import { generateAbbreviation } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { BadgeCheck, Plus, Trash2, UserCheck } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAccount, useWatchContractEvent } from "wagmi";
import { z } from "zod";

interface ICollector {
  id: bigint;
  name: string;
  contact: string;
  numberOfWasteCollected?: bigint;
  pricePerKg: bigint;
  collectorAddress: string;
  isAvailable: boolean;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  contact: z.string().min(10, {
    message: "Contact must be at least 10 characters",
  }),
  address: z
    .string()
    .min(42, {
      message: "Collector Wallet Address must be 20 characters",
    })
    .max(42, {
      message: "Address cannot be more than 20 characters",
    }),
});

export default function CollectorsPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const account = useAccount();
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const getRecyclerCollectors = useGetRecyclerCollectors();
  const [collectors, setCollectors] = React.useState<ICollector[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  React.useEffect(() => {
    setLoading(true);
    try {
      getRecyclerCollectors().then((data) => {
        console.log({data})
       setCollectors(data as ICollector[])
      });
    } catch (error) {
      console.error("An error occured while initializing", error);
    }
  }, [account.address]);
  useWatchContractEvent({
    address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
    abi: WASTE_CONTRACT_ABI,
    eventName: "collectorCreated",
    onLogs(logs) {
      const newCollector: ICollector = {
        id: logs[0].args.collectorId!,
        name: logs[0].args._name!,
        collectorAddress: logs[0].args._collectorAddress!,
        contact: logs[0].args._contact!,
        isAvailable:true,
        numberOfWasteCollected:BigInt("0"),
        pricePerKg:BigInt("0"),
      };
      setCollectors((prev) => [...prev, newCollector]);
    },
  });

 

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const result = await writeContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createCollector",
        args: [data.address as `0x${string}`, data.name, data.contact],
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      if (transactionReceipt.status === "success") {
        toast.success("Colector created successfully");
    
        console.log(transactionReceipt);
        reset();
        setIsOpen(false);
    
        return transactionReceipt.transactionHash;
      }
   
    } catch (error) {
      console.error("Error creating collector onchain:", error);
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="px-8 bg-[#F5FFF9] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#228B22]">Collectors</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-0.5" /> Add Collector
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Collector</DialogTitle>
              <DialogDescription>
                Enter the details of the new collector here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-4 w-full space-y-2">
                <div className="w-full items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="-3"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm ">{`${errors.name.message}`}</p>
                  )}
                </div>
                <div className="w-full items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    className=""
                    {...register("contact", {
                      required: "Contact is required",
                    })}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm ">{`${errors.contact.message}`}</p>
                  )}
                </div>
                <div className="w-full items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                 Wallet   Address
                  </Label>
                  <Textarea
                    id="address"
                    className=""
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm ">{`${errors.address.message}`}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button disabled={submitting} type="submit">{
                  submitting ? "Creating..." : "Create Collector"
                  }</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-10 flex-wrap">
        {collectors.map((collector) => (
          <Card
            className="max-w-md bg-white shadow-md md:min-w-[420px]"
            key={collector.id}
          >
            <CardHeader className="flex gap-4 p-4">
              <div className="flex items-center justify-between">
                <Avatar className="w-14 h-14 mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt={`${collector.name}`}
                  />
                  <AvatarFallback>
                    {generateAbbreviation(collector?.name || "Anonymous User")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h2 className="text-lg leading-tight font-semibold">
                      {collector?.name}
                    </h2>
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 leading-tight">
                    Collector
                  </p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 leading-tight">★★★★★</span>
                  </div>
                </div>
                <span className="ml-auto text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {collector.isAvailable ? "Available": "N/A"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="">Contact:</span>
                <span className="font-bold">{collector.contact}</span>
              </div>
              <p className="mt-2 text-sm">
                Total waste collected:{" "}
                <span className="font-bold">
                  {collector?.numberOfWasteCollected} kg
                </span>
              </p>
              <p className="text-sm">
                Completed collections:{" "}
                <span className="font-bold">
                  {collector?.collectorAddress}
                </span>
              </p>
            </CardContent>
            {/* <CardFooter className="flex justify-between p-4">
              <Button
                variant="outline"
                className="bg-white text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-0.5" />
                Remove
              </Button>
              <Button onClick={handleAssignCollector} variant="default" className="bg-black text-white">
                <UserCheck className="w-4 h-4 mr-0.5" />
                Assign
              </Button>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
