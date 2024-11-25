"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type Company = {
  _id: string;
  companyLogo: string | "";
  rate: string;
  companyName: string;
  offers: string;
  physicalAddress: string;
  companyId: number;
};

const CompanyCard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL!}/company`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
            },
          }
        );
        setCompanies(response?.data?.data || []);
        console.log("response", response?.data?.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p className="p-10 text-gray-600">Loading...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;
  if (companies.length === 0)
    return <p className="p-10 text-gray-600">No companies found.</p>;

  return (
    <div className="max-w-[95%] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 px-4 sm:px-8 pb-20">
      {companies.map((item, index) => (
        <div
          key={index}
          className="bg-white border flex justify-center rounded-lg border-1 border-[#70B170]"
        >
          <div className="w-full">
            <div className="bg-gradient-to-r pr-4 from-[#DAFFDA] to-[#237823] h-[80px] rounded-lg flex justify-end w-full">
              <Image src="/rate.svg" height={20} width={20} alt="rating" />
              <Image src="/rate.svg" height={20} width={20} alt="rating" />
              <Image src="/rate.svg" height={20} width={20} alt="rating" />
              <Image src="/rate.svg" height={20} width={20} alt="rating" />
              <Image src="/rate.svg" height={20} width={20} alt="rating" />
            </div>
            <div className="ml-5 -mt-10">
              <Image
                src={item.companyLogo || "/company-logo.svg"}
                height={60}
                width={60}
                alt={`${item.companyName} logo`}
                className="rounded-full w-16 h-16 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/company-logo.svg";
                }}
              />
            </div>
            <div className="p-3 mt-2">
              <h3 className="text-2xl font-bold">{item.companyName}</h3>
              <p className="text-lg mt-2 opacity-70">{item.physicalAddress}</p>
              <div className="mt-5 flex justify-end">
                <Link
                  href={`/companies/${item._id}`}
                  className="bg-[#228B22] text-white p-[12.8px] rounded-[24px] font-semibold font-dms_sans hover:bg-green-700 transition-colors px-7 py-2 text-sm"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyCard;
