"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical, Loader2, Plus } from "lucide-react";

import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WasteType } from "@/app/recyclers/register/page";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { config } from "@/config";
import { WAST_CONTRACT_ADDRESS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGetRecyclerOffers } from "@/hooks/use-get-offers";
import { useReadRecyclers } from "@/hooks/use-get-recycler";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { useAccount, useWatchContractEvent } from "wagmi";
const formSchema = z.object({
  waste_type: z.string().min(1, {
    message: "Waste type must be at least 1 characters",
  }),
  quantity: z.string().min(1, {
    message: "quantity must be at least 1 characters",
  }),
  price: z.string().min(1, {
    message: "price must be at least 1 characters",
  }),
});
interface IOffer {
  minQuantity: bigint;
  name: string;
  offerId?: bigint;
  pricePerKg: bigint;
  recyclerAddress: string;
  recyclerId?: bigint;
}
const page = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [wasteType, setwasteTypes] = useState<WasteType[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const getRecycler = useReadRecyclers();
  const getRecyclerOffers = useGetRecyclerOffers();
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setloading] = useState(false);
  const [error, setError]= useState("");
const account   = useAccount()

  const fetchData = async () => {
    setloading(true);
    try {
      const recycler = await getRecycler();
  
      const offerData = await getRecyclerOffers(recycler[0]);
      await getWasteTypes();
      setOffers(offerData as IOffer[]);

      setloading(false);
    } catch (error) {
      console.error("An error occured while initializing", error);
      setError("An error occured while initializing")
      setloading(false);
      // throw new Error("An error occured while initializing")
  
    }
  };
  const getWasteTypes = async () => {
    try {
      const res = await axios.get(
        `https://api-greencycle.onrender.com/api/waste-type`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
          },
        }
      );

      setwasteTypes(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [account.address]);

  useWatchContractEvent({
    address: WAST_CONTRACT_ADDRESS as `0x${string}`,
    abi: WASTE_CONTRACT_ABI,
    eventName: "OfferCreated",
    onLogs(logs) {
      const newOffer: IOffer = {
        minQuantity: logs[0].args._miniQuantity!,
        name: logs[0].args._wasteType!,
        pricePerKg: logs[0].args._pricePerKg!,
        recyclerAddress: logs[0].args.recycler!,
      };
      setOffers((prev) => [...prev, newOffer]);
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const result = await writeContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WAST_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createOffer",
        args: [data.waste_type, BigInt(data.price), BigInt(data.quantity)],
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      if (transactionReceipt.status === "success") {
        return transactionReceipt.transactionHash;
      }
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  if(!account.address) return <div className="w-full h-screen flex items-center justify-center">
 <w3m-connect-button/>
</div>
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  return (
    <div className="px-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Offers</h1>

        {/* <Button>
					Add <Plus />
				</Button> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add new Offer</DialogTitle>
                {/* <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* <div className="grid gap-4">
								<Label
									htmlFor="title"
									className="">
									Title
								</Label>
								<Input
									id="name"
									defaultValue="Pedro Duarte"
									className="col-span-3"
								/>
							</div> */}

                <div className="flex w-full items-center gap-4">
                  <div className="grid gap-4 w-full">
                    <Label htmlFor="wasteType">Waste Type</Label>
                    <Select
                      onValueChange={(value) => setValue("waste_type", value)}
                    >
                      <SelectTrigger id="wasteType">
                        <SelectValue placeholder="Select Waste type" />
                      </SelectTrigger>
                      <SelectContent className="font-dms_sans">
                        {wasteType?.map((type) => (
                          <SelectItem key={type._id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.waste_type && (
                      <p className="text-red-500">
                        {errors.waste_type.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 mt-4 w-full">
                    <Label htmlFor="quantity" className="">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      defaultValue=""
                      type="number"
                      {...register("quantity", {
                        required: "Quantity is required",
                      })}
                      className="col-span-3 w-full"
                      placeholder="Enter price"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm ">{`${errors.quantity.message}`}</p>
                    )}
                    <p className="text-xs text-gray-400 text-right -mt-4">
                      Supported format: Kg
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <Label htmlFor="price" className="">
                    Price
                  </Label>
                  <Input
                    id="price"
                    {...register("price", {
                      required: "Price is required",
                    })}
                    defaultValue=""
                    className="col-span-3"
                    placeholder="Enter price"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm ">{`${errors.price.message}`}</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <div className="w-full flex justify-between">
                  <div className="inline-flex items-center gap-2">
                    <Image
                      src={"/help-circle.svg"}
                      alt="help"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#6F6F6F] text-sm">Help center</p>
                  </div>
                  <div className="space-x-2">
                    <Button type="button" variant={"outline"}>
                      Cancel
                    </Button>
                    <Button
                      disabled={submitting}
                      type="submit"
                      className="bg-[#228B22]"
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Card>
              <CardHeader className="flex-row w-full justify-between">
                <CardTitle>
                  {Number(offer.minQuantity.toString())}kg Of {offer.name}
                </CardTitle>
                {/* <CardDescription className="text-xl">Requests </CardDescription> */}

                <EllipsisVertical />
              </CardHeader>
              <CardContent>
                <p>
                  <span className="text-[#757575]">Price:</span>{" "}
                  {Number(offer.pricePerKg.toString())} Eth per KG
                </p>
                <p>
                  <span className="text-[#757575]">Recycler Address: </span>
                  {offer.recyclerAddress}
                </p>
                <p>
                  <span className="text-[#757575]">Quantity: </span>{" "}
                  {Number(offer.minQuantity.toString())}kg
                </p>
              </CardContent>

              <CardFooter className="flex w-full justify-between">
                <p className="text-[#757575]">
                  Waste type:
                  <Button className="ml-2 rounded-full bg-[#228B22]">
                    {offer.name}
                  </Button>
                </p>
                <Button variant={"outline"} className="text-red-500 py-2">
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>
            <p>No Available Offers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
