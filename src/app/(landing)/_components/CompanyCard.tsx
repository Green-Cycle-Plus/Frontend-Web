// import axios from 'axios';
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'

// const CompanyCard = () => {
   
//     const [companies, setCompanies] = useState<Company[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);


//     useEffect(() => {

//         const fetchCompanies = async () => {
//           setLoading(true)
//           try {
//             const response = await axios.get("https://api-greencycle.onrender.com/api/company", {
//               headers: {
//                 // Authorization: "Bearer YOUR_API_TOKEN", // Replace with your token
//                 // "Content-Type": "application/json",
//                 "x-api-key": "c144fca11d1c9453d319eb71a823fca1a6facffa9b534cd6b825c36e57346c40", // Example header, optional
//               },
//             });
//             console.log("response", response.data?.data);
//             setCompanies(response.data?.data || []);
//           } catch (error) {
//             console.error("Error fetching companies:", error);
//             setError("Failed to load companies. Please try again later.");
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchCompanies();
//       }, []);
//     return (
//         <div className=" max-w-[95%] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 px-4 sm:px-8 pb-20">
//             {
//                 CompanyCard.map((item, index) => (
//                     <div key={index} className='bg-white border flex justify-center rounded-lg border-1 border-[#70B170] '>
//                         <div className='w-full'>
//                             <div className='bg-gradient-to-r pr-4 from-[#DAFFDA] to-[#237823] h-[80px] rounded-lg flex justify-end w-full'>
//                                 <Image src={item.rate} height={20} width={20} alt='rate' />
//                                 <Image src={item.rate} height={20} width={20} alt='rate' />
//                                 <Image src={item.rate} height={20} width={20} alt='rate' />
//                                 <Image src={item.rate} height={20} width={20} alt='rate' />
//                             </div>
//                             <div className='ml-5 -mt-10'>
//                                 <Image src={item.logo} height={60} width={60} alt='plasctic' className='' />
//                             </div>
//                             <div className="p-3">

//                                 <div className='mt-5'>
//                                     <h1 className=''>Company: {item.name}</h1>
//                                     <h1>Waste Offers: {item.offers}</h1>
//                                 </div>
//                                 <div className=''>
//                                     <p>Location: {item.location}</p>
//                                 </div>
//                                 <div className='flex gap-5 mt-5'>
//                                     <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Glass</h1>
//                                     <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Metals</h1>
//                                     <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Paper</h1>

//                                 </div>
//                                 <div className='mt-5 flex justify-end'>
//                                     <button className="bg-[#228B22] text-white p-[12.8px] rounded-[24px] font-semibold font-dms_sans hover:bg-green-700 transition-colors px-7 py-2 text-sm">
//                                         View
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>


//                     </div>

//             // {loading&&( <p className="p-10 text-gray-600">Loading...</p>)}
//             // {error&&(<p className="p-10 text-red-600">{error}</p>)} 
//             // {(!loading && !error) && (<CompanyCard companies={companies}/>)}
//                 ))
//             }
//         </div>
//     )
// }

// export default CompanyCard

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Company = {
  companyLogo: string;
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL!}/company`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
        });
        setCompanies(response?.data?.data || []);
        console.log("response", response?.data?.data )
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
  if (companies.length === 0) return <p className="p-10 text-gray-600">No companies found.</p>;

  return (
    <div className="max-w-[95%] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 px-4 sm:px-8 pb-20">
      {companies.map((item, index) => (
        <div key={index} className="bg-white border flex justify-center rounded-lg border-1 border-[#70B170]">
          <div className="w-full">
            <div className="bg-gradient-to-r pr-4 from-[#DAFFDA] to-[#237823] h-[80px] rounded-lg flex justify-end w-full">
              {Array.from({ length: 4 }).map((_, subIndex) => (
                <Image key={`${index}-${subIndex}`} src={item.rate} height={20} width={20} alt={`Rating ${subIndex + 1}`} />
              ))}
            </div>
            <div className="ml-5 -mt-10">
              <Image src={item.companyLogo} height={60} width={60} alt={`${item.companyName} logo`} className='rounded-full w-16 h-16' />
            </div>
            <div className="p-3">
              <div className="mt-5">
                <h1>Company: {item.companyName}</h1>
                <h1>Waste Offers: {item.offers}</h1>
              </div>
              <div>
                <p>Location: {item.physicalAddress}</p>
              </div>
              <div className="flex gap-5 mt-5">
                <h1 className="bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm">Glass</h1>
                <h1 className="bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm">Metals</h1>
                <h1 className="bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm">Paper</h1>
              </div>
              <div className="mt-5 flex justify-end">
                <Link href={`/companies${item.companyId}`} className="bg-[#228B22] text-white p-[12.8px] rounded-[24px] font-semibold font-dms_sans hover:bg-green-700 transition-colors px-7 py-2 text-sm">
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
