"use client";

import React from "react";
import CollectorsPageHeader from "./_components/header";
import { useAccount } from "wagmi";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected } = useAccount();
  return (
    <>
      {isConnected ? (
        <div className="p-8 bg-[#F5FFF9] min-h-screen">
          <CollectorsPageHeader />
          {children}
        </div>
      ) : (
        <div className="p-8 bg-[#F5FFF9] min-h-screen flex items-center justify-center w-full">
          <p className="font-medium text-center ">
            Please Connect your wallet to access this page
          </p>
          <w3m-connect-button />
        </div>
      )}
    </>
  );
}

export default Layout;
