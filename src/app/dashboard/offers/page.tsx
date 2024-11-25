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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { WasteType } from "@/app/recyclers/register/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { config } from "@/config";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";

import { writeContract } from "@wagmi/core";
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
      console.log({ res });
      setwasteTypes(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getWasteTypes();
  }, []);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      console.log({ data });
      const result = await writeContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createOffer",
        args: [data.waste_type, BigInt(data.price), BigInt(data.quantity)],
      });
      console.log({ result });
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
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
        <Card>
          <CardHeader className="flex-row w-full justify-between">
            <CardTitle>500kg Of Glass</CardTitle>
            {/* <CardDescription className="text-xl">Requests </CardDescription> */}

            <EllipsisVertical />
          </CardHeader>
          <CardContent>
            <p>
              <span className="text-[#757575]">Price:</span> 10,000 tokens
            </p>
            <p>
              <span className="text-[#757575]">Location:</span>Lagos
            </p>
            <p>
              <span className="text-[#757575]">Quantity:</span> 500kg
            </p>
          </CardContent>

          <CardFooter className="flex w-full justify-between">
            <p className="text-[#757575]">
              Waste type:{" "}
              <Button className="rounded-full bg-[#228B22]">Glass</Button>
            </p>
            <Button variant={"outline"} className="text-red-500 py-2">
              Remove
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex-row w-full justify-between">
            <CardTitle>50kg Of Cardboard</CardTitle>
            {/* <CardDescription className="text-xl">Requests </CardDescription> */}

            <EllipsisVertical />
          </CardHeader>
          <CardContent>
            <p>
              <span className="text-[#757575]">Price:</span> 2,000 tokens
            </p>
            <p>
              <span className="text-[#757575]">Location:</span>Abuja
            </p>
            <p>
              <span className="text-[#757575]">Quantity:</span> 50kg
            </p>
          </CardContent>

          <CardFooter className="flex w-full justify-between">
            <p className="text-[#757575]">
              Waste type:{" "}
              <Button className="rounded-full bg-[#228B22]">Cardboard</Button>
            </p>
            <Button variant={"outline"} className="text-red-500 py-2">
              Remove
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
