"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DataTableColumn from "@/components/dashboard/dataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { EllipsisVertical, Loader2 } from "lucide-react";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetRole } from "@/hooks/use-get-role";
import { useRouter } from "next/navigation";
import { useReadRecyclers } from "@/hooks/use-get-recycler";
import { readContract } from "@wagmi/core";
import { config } from "@/config";
import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { useAccount } from "wagmi";
import { set } from "react-hook-form";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IRecycler {
  id: bigint;
  recyclerAddress: `0x${string}`;
  location: string;
  rating: bigint;
  isRegistered: boolean;
  totalWasteRequest: bigint;
  totalAmountSpent: bigint;
  totalWasteCollectedInKgs: bigint;
}

export interface IRequest {
  wasteType: string;
  id: bigint;
  escrowRequestID: bigint;
  amountPaid: bigint;
  weight: number;
  valuedAt: bigint;
  offerId: number;
  longitude: number;
  latitude: number;
  location:string;
  userAddress: `0x${string}`;
  isCompleted: boolean;
  status: number;
  recyclerAddress: `0x${string}`;
  assignedCollector: `0x${string}`;
  isAccepted: boolean;
}
const page = () => {
  const { data: role, isLoading: roleLoading } = useGetRole();
  const router = useRouter();
  const account = useAccount();
  const getRecycler = useReadRecyclers();
  const [recycler, setRecycler] = useState<IRecycler | null>(null);
  const [requests, setrequests] = useState<IRequest[]>([]);
  const [loading, setloading] = useState(false);

  const getRecyclerRequests = async (id: bigint) => {
    try {
      if (!account?.address) throw new Error("Please connect Wallet");
      const result = await readContract(config, {
        abi: WASTE_CONTRACT_ABI,
        address: WASTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getRecyclerRequests",
        args: [id],
      });
      return result;
    } catch (error) {
      console.error("Error getting request onchain:", error);
      throw new Error("Failed to get requests onchain");
    }
  };

  const fetchData = async () => {
    setloading(true);
    try {
      const recycler = await getRecycler();
      const requests = await getRecyclerRequests(recycler.id);
      console.log({ recycler, requests });

      setRecycler(recycler);
      setrequests(requests as IRequest[]);
      setloading(false);
    } catch (error) {
      console.error("An error occured while initializing", error);

      setloading(false);
      // throw new Error("An error occured while initializing")
    }
  };
console.log({role})
  useEffect(() => {
    if (role) {
    //   if (role[0] !== "Recycler") router.push("/");
      fetchData();
    }
  }, [role]);
  if (!account.address)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <w3m-connect-button />
      </div>
    );
  if (roleLoading || loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );

  const activeRequests =
    requests?.filter((request) => request.status === 1) ?? [];
  const pendingRequests =
    requests?.filter((request) => request.status === 0) ?? [];
  const rejectedRequests =
    requests?.filter((request) => request.status === 2) ?? [];
  const acceptedRequests =
    requests?.filter((request) => request.isAccepted) ?? [];
  const data = {
    labels: ["Accepted", "Pending", "Rejected"],
    datasets: [
      {
        label: "Waste Status",
        data: [
          acceptedRequests.length,
          pendingRequests.length,
          rejectedRequests.length,
        ],
        backgroundColor: ["#37D837", "#F3FF0E", "#FF0E0E"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="pb-5 px-10">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl text-[#285528]">Overview</h1>
        <Image src="/filter.svg" alt="overview" width={20} height={20} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <DashboardCard
          description="Total Waste Processed"
          title={`${recycler?.totalWasteCollectedInKgs.toString()} Tons`}
          image="/processed.svg"
          percent="29"
        />
        <DashboardCard
          description="Total Amount Spent"
          title={`$${recycler?.totalAmountSpent.toString()}`}
          image="/revenue.svg"
          percent="59"
        />
        <DashboardCard
          description="Total Waste Requests"
          title={`${requests.length.toString()}`}
          image="/profile-2green.svg"
          percent="100"
        />
      </div>

      <div className="grid grid-cols-5 gap-6 mt-8">
        <div className="col-span-3">
          <div className="flex w-full justify-between">
            <h1 className="text-xl ">Active Collection Request</h1>
            <Image src="/filter.svg" alt="overview" width={25} height={25} />
          </div>
          <DataTableColumn requests={activeRequests} />
        </div>
        <div className="col-span-2 mt-5">
          <div className="flex w-full justify-between pb-5">
            <h1 className="text-xl ">Chart</h1>
            <Image src="/filter.svg" alt="overview" width={20} height={20} />
          </div>
          <Card>
            <CardHeader className="flex-row w-full justify-between">
              <CardDescription className="text-xl">Requests </CardDescription>

              <EllipsisVertical />
            </CardHeader>
            <CardContent>
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 10,
                      },
                    },
                  },
                }}
              />{" "}
              {/* Add options here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
