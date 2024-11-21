


"use client";
import Image from "next/image";

// Define an interface for the company object


const CategoryCard = ({companies}:{
  companies:Company[]
}) => {
  return (
    <div className="w-full p-10 justify-center bg-[#E8F7E8] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 sm:px-8 pb-20">
      {companies.length > 0 ? (
        companies.map((item, index) => (
            <div key={index} className="bg-white flex justify-center p-10 rounded-lg h-[275.34px]">
              <div>
                <div className="bg-gradient-to-r from-[#DAFFDA] to-[#237823] px-10 py-2 h-[150px] rounded-lg w-[245.05px] flex items-center justify-center">
                  <Image
                    src={item.img || "/fallback-image.png"} // Fallback image if URL is missing
                    height={150}
                    width={150}
                    alt={`${item.companyName} logo`}
                    className="object-contain"
                    unoptimized // Use this if image comes from a non-optimized source
                  />
                </div>
                <div className="mt-5">
                  <h1 className="font-bold text-center">{item.name}</h1>
                </div>
                <div className="mt-2 text-center">
                  <p>{item.companyName}</p>
                </div>
              </div>
            </div>
        )
        )
      ) : (
        <p className="text-gray-600 col-span-full text-center">No companies found</p>
      )}
    </div>
  );
};

export default CategoryCard;

