import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";

const CollectorsPageHeader = () => {
  const { isConnected } = useAccount();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-6">
        <Link href="/collectors" className="text-3xl font-bold text-[#228B22] font-londrina">
          Collectors
        </Link>
        <Link
          href="/collectors/assigned-requests"
          className="text-[15px] font-light"
        >
          Assigned Requests
        </Link>
      </div>

      {isConnected ? (
        <Button className="bg-[#228B22] text-white px-0 py-5 rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors">
          <w3m-account-button balance="hide" />{" "}
        </Button>
      ) : (
        <w3m-connect-button />
      )}
    </div>
  );
};

export default CollectorsPageHeader;
