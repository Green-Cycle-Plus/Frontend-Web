import { GetStartedModal } from '@/components/modals/get-started-modal';
import Image from 'next/image'
import React from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";


const HowItWorks = () => {
  return (
    <>    <section className="mb-[100px] mt-[150px] font-dms_sans">
      <h1 className='text-[#082608] flex justify-center text-4xl mt-10 font-bold'>How Greencycle works</h1>
      <div className='' style={{
        backgroundImage: "url(/back.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
        <div className='grid lg:grid-cols-2 w-11/12 mx-auto space-x-32 mt-20'>
          <div>
            <Image
              src='/afri.svg'
              height={400}
              width={400}
              alt='africa'
            />
          </div>
          <div className=''>
            <h1 className='text-[36px]'>Submit Your Waste</h1>
            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-5 space-x-5' />
              <h1 className='text-[24px]'>Find the nearest recycling center using our <br /> geo-location feature.
              </h1>
            </div>

            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-2 space-x-5' />
              <h1 className='text-[24px]'>Submit your waste and scan the QR code.</h1>
            </div>

            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-5 space-x-5' />
              <h1 className='text-[24px]'>Track the journey of your waste from <br /> submission to recycling.</h1>
            </div>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 w-11/12 mx-auto space-x-32 mt-20'>
          <div className=''>
            <h1 className='text-[36px]'>Earn Rewards</h1>
            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-5 space-x-5' />
              <h1 className='text-[24px]'>Get rewarded for your eco-conscious<br /> actions.</h1>
            </div>

            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-2 space-x-5' />
              <h1 className='text-[24px]'>Earn tokens based on the quality and<br /> quantity of your waste.</h1>
            </div>

            <div className='flex mt-5 gap-5'>
              <IoMdCheckmarkCircle className='w-[26.67px] h-[26.67px] text-[#228B22] mt-5 space-x-5' />
              <h1 className='text-[24px]'>Purchase eco-friendly products from our<br /> marketplace.</h1>
            </div>
          </div>
          <div className=''>
            <Image
              src='/monalisa.svg'
              height={350}
              width={350}
              alt='africa'
              className=''
            />
          </div>
        </div>
      </div>
    </section>
      <section className='w-11/12 mx-auto h-[524px] bg-[#497E5D] rounded-xl ' style={{
        backgroundImage: "url(/spiral.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
        <div className='flex justify-center p-20'>
          <div className='mt-10'>
            <h4 className='text-6xl font-bold text-white flex justify-center'>Ready To Be Part Of The Solution?</h4>
            <div className='mt-10'>
              <p className='flex justify-center text-4xl text-white'>Join us today and start your journey towards a</p>
              <p className='flex justify-center text-4xl mt-4 text-white'>sustainable future</p>
            </div>
            <div className='flex justify-center mt-5'>
            <button className="border border-white text-white p-[12.8px]  rounded-[24px] font-semibold text-base font-dms_sans hover:border-gray-300 transition-colors">
              Get Started
            </button>
          <GetStartedModal label="white"/>
          </div>

          </div>
        </div>

      </section>
    </>

  )
}

export default HowItWorks
