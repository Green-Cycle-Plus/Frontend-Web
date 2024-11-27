"use client";

import { useEffect, useState } from "react";
import LatestRequests from "./_components/latest- request";
import { CollectorOverview } from "./_components/collector-overview";
import { useCollectorRequests } from "@/hooks/use-collector-requests";
import { Request } from "./_components/waste-requests";
import { useAccount } from "wagmi";

export default function CollectorDashboard() {
  const { address } = useAccount()
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function run() {
      const { getCollectorRequests } = useCollectorRequests(address as `0x${string}`);
      const collectionRequests = await getCollectorRequests();
      console.log("Collection Requests", collectionRequests)

      // setRequests(collectionRequests);
    }

    run();
  }, []);

  console.log("Collector Requests: ", requests);

  return (
    <div className="p-8 bg-[#F5FFF9] min-h-screen">
      <CollectorOverview />
      <LatestRequests 
        // requests={requests}
      />
    </div>
  );
}
