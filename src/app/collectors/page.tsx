"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollectorOverview } from "./_components/collector-overview";
import { WasteRequests } from "./_components/waste-requests";
import Header from "../(landing)/_components/Header";
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";

export default function CollectorDashboard() {
  const { isConnected } = useAccount();
  return (
    <>
      <div className="p-8 bg-[#F5FFF9] min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#228B22] mb-6">
            Collector Dashboard
          </h1>
          {isConnected ? <Button className="bg-[#228B22] text-white px-0 py-5 rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors"><w3m-account-button balance="hide"/> </Button>: <w3m-connect-button/>}
        </div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Waste Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <CollectorOverview />
          </TabsContent>
          <TabsContent value="requests">
            <WasteRequests />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
