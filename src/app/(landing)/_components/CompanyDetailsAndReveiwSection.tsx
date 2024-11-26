"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import CompanyReviewSection from "./CompanyReviewSection";
import ReviewAboutSection from "./ReviewAboutSection";
import WasteRequests from "./WasteRequests";
const links = [
  { name: "Items", href: "#", value: "items" },
  { name: "Reviews", href: "#", value: "reviews" },
  { name: "About", href: "#", value: "about" },
  // { name: "Shop Policy", href: "#", value: "shop-policy" },
];
const CompanyDetailsAndReveiwSection = ({ company }: { company?: Company }) => {
  const [activeTab, setActiveTab] = useState("items");

  return (
    <div className="w-full">
      <div className="w-full flex items-center bg-[#CFEDD5] h-[50px] rounded-tl-[10px] rounded-tr-[10px] my-11">
        <div className="w-full overflow-x-auto flex h-12">
          {links.map((link) => (
            <div
              key={link.value}
              onClick={() => setActiveTab(link.value)}
              className={cn(
                "relative flex items-center justify-center px-6  transition-colors hover:text-primary  font-dms_sans font-semibold text-sm cursor-pointer shrink-0",
                activeTab === link.value
                  ? "text-[#E8FFE8] bg-[#88D0A3] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brandGreen rounded-tl-[10px] "
                  : "text-[#717274]"
              )}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>
      {activeTab === "items" && <WasteRequests companyId={company?.companyId}/>}

      {activeTab === "reviews" && (
        <div className="w-full">
          <CompanyReviewSection />
        </div>
      )}

      {activeTab === "about" && <ReviewAboutSection company={company} />}
    </div>
  );
};

export default CompanyDetailsAndReveiwSection;
