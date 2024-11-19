import { GetStartedModal } from '@/components/modals/get-started-modal'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LandingPageHero = () => {
  return (
    <div className="px-5 md:px-10 lg:pl-[100px] lg:pr-[68px] pt-6 md:pt-[100px] ">
    <div className="flex flex-col md:flex-row items-center justify-between gap-[108px] ">
      <div className="w-full">
      <h1 className="relative w-full tracking-[2%] text-[32px] lg:text-[42px] font-dms_sans font-semibold text-brandText lg:!leading-[62.2px] mb-4">
      Revolutionizing Waste Management,
      <span className="relative inline-block">
        <span className="relative z-10">One Step at a Time.</span>
        <span
          className="absolute bottom-0 left-0 w-full h-[45%] bg-[#228B22] bg-opacity-60"
          aria-hidden="true"
        />
      </span>
    </h1>
        
        <p className="text-xl font-medium font-dms_sans text-[#797979] ">
        Tired of the endless cycle of waste? Want to make a positive impact on the environment? Our blockchain-powered platform is here to revolutionize the way you think about waste.
        </p>

        <div className="flex flex-wrap gap-4 mt-7">
          <GetStartedModal/>
          <button className="border border-[#228B22] text-[#228B22] p-[12.8px]  rounded-[24px] font-semibold text-base font-dms_sans hover:border-gray-300 transition-colors">
            Learn more
          </button>
        </div>
      </div>


    <Image src="/waste.svg" alt="Image" className='w-full md:w[300px] md:h-[250px] lg:w-[428px] lg:h-[374px]' width={0} height={0}/>
    </div>
  </div>
  )
}

export default LandingPageHero