import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CompanyCard = () => {
    const companyCard = [
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        },
        {
            logo: "/logo.svg",
            rate: "/rate.svg",
            name: "Solscan",
            offers: "2",
            location: "Abuja",

        }
    ]
    return (
        <div className=" max-w-[95%] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 px-4 sm:px-8 pb-20">
            {
                companyCard.map((item, index) => (
                    <div key={index} className='bg-white border flex justify-center rounded-lg border-1 border-[#70B170] '>
                        <div className='w-full'>
                            <div className='bg-gradient-to-r pr-4 from-[#DAFFDA] to-[#237823] h-[80px] rounded-lg flex justify-end w-full'>
                                <Image src={item.rate} height={20} width={20} alt='rate' />
                                <Image src={item.rate} height={20} width={20} alt='rate' />
                                <Image src={item.rate} height={20} width={20} alt='rate' />
                                <Image src={item.rate} height={20} width={20} alt='rate' />
                            </div>
                            <div className='ml-5 -mt-10'>
                                <Image src={item.logo} height={60} width={60} alt='plasctic' className='' />
                            </div>
                            <div className="p-3">

                                <div className='mt-5'>
                                    <h1 className=''>Company: {item.name}</h1>
                                    <h1>Waste Offers: {item.offers}</h1>
                                </div>
                                <div className=''>
                                    <p>Location: {item.location}</p>
                                </div>
                                <div className='flex gap-5 mt-5'>
                                    <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Glass</h1>
                                    <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Metals</h1>
                                    <h1 className='bg-gray-100 p-2 rounded-2xl text-gray-600 text-sm'>Paper</h1>

                                </div>
                                <div className='mt-5 flex justify-end'>
                                    <Link href={`/companyPage/${item.name}`} className="bg-[#228B22] text-white p-[12.8px] rounded-[24px] font-semibold font-dms_sans hover:bg-green-700 transition-colors px-7 py-2 text-sm">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </div>
                ))
            }
        </div>
    )
}

export default CompanyCard
