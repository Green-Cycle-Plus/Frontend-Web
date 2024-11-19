import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import CategoryCard from './CategoryCard'
import CompanyCard from './CompanyCard'

const CompanyHero = () => {
    return (
        <>       
         <div>
            <section className='bg-gradient-to-r from-[#84E4A8] to-[#497E5DEB] p-10 h-[586px] relative' style={{
              
            }}>
                <Image fill src='/bg.png' alt='bg' className='object-covers'/>
                <div className="px-5 md:px-10 lg:pl-[100px] lg:pr-[68px] pt-6 md:pt-[100px] z-50 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-[108px] ">
                        <div className="w-full">
                            <h1 className="relative w-full tracking-[2%] text-[32px] lg:text-[42px] font-dms_sans font-semibold text-brandText lg:!leading-[62.2px] mb-4">
                            Start browsing to discover new companies                               
                            </h1>
                            <div className='relative w-full flex'>
                           <Input  className='bg-white p-10' placeholder='Search for anything'  />
                           <button className='absolute right-3 top-5 bg-[#228B22] text-white p-[12.8px] rounded-xl font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors'>Search</button>
                           </div>

                            <div className="flex flex-wrap gap-4 mt-7">
                                <button className="bg-[#228B22] text-white p-[12.8px] rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors">
                                    Get started
                                </button>
                                <button className="border border-[#228B22] text-[#228B22] p-[12.8px]  rounded-[24px] font-semibold text-base font-dms_sans hover:border-gray-300 transition-colors">
                                    Learn more
                                </button>
                            </div>
                        </div>


                        <Image src="/waste.svg" alt="Image" className='w-full md:w[300px] md:h-[250px] lg:w-[428px] mb-10 lg:h-[374px]' width={0} height={0} />
                    </div>
                </div>
            </section>
            <div className='flex justify-center mt-10'>
                <h1 className='text-4xl font-bold'>Find by category</h1>
            </div>
        </div>
        <CategoryCard />
        <div className='ml-5 mt-10'>
            <h1 className='text-2xl font-bold ml-10'>Recommended Companies</h1>
        </div>
        <CompanyCard/>
        </>

    )
}

export default CompanyHero
