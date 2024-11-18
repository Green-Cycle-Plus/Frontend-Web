import { User } from 'lucide-react'
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button';
import CompanyDetailsAndReveiwSection from '../../_components/CompanyDetailsAndReveiwSection';
import Footer from '../../_components/footer';


const page = () => {
  return (
    <main className='w-full  py-5'>
    <div className='font-dms_sans flex gap-1 items-center mb-[57px] px-5 md:px-10 lg:px-[100px]'>
        <Link href="/" className='text-[#717274] font-medium text-sm'>Home</Link>
        <span className='text-[#717274] font-medium text-sm'>/</span>
        <span className='text-brandText font-medium text-sm'>Search Results</span>
    </div>

    <section className='bg-companyDetailsBg bg-contain w-full h-[285px] relative'>
    <Image width={0} height={0}  src='/company-logo.svg' alt='company-logo' className='w-[166px] h-[166px] absolute left-[20px] lg:left-[120px] top-[161px]'/>
    </section>
    <section className='w-full px-5 md:px-10 lg:px-[120px] flex flex-col lg:flex-row items-start justify-between'>
    <div className='font-dms_sans text-[#717274] flex flex-col gap-2 font-medium text-sm mt-14'>
        <h4 className='font-semibold text-lg text-[#121417]'>Solscan</h4>
        <p>@nicorobinarts87</p>
        <p><IoLocationOutline className='inline-block h-4 w-4 mr-1'/>Lekki, lagos</p>
        <div className='flex items-center gap-1'>
            <p className='flex'><CiUser className='inline-block h-4 w-4 mr-1' />2k Followers</p>
            <p ><CiUser className='inline-block h-4 w-4 mr-1' />245 Following</p>
        </div>
    </div>
    <div className='flex flex-col gap-3 w-full lg:w-auto font-dms_sans mt-6'>
       <Button className='bg-brandGreen text-white rounded-[4px] w-full lg:w-fit h-fit py-3 px-5 '><User className='inline-block h-4 w-4 '/>Follow company</Button> 
       <Button className='bg-[#CFFFE1] text-brandGreen rounded-[4px] w-full lg:w-fit h-fit py-3 px-5'><HiOutlineEnvelope className='inline-block h-4 w-4 '/>Contact company</Button> 
    </div>
    </section>

    <section className='px-5 md:px-10 lg:px-[100px] mb-[120px]'>
      <CompanyDetailsAndReveiwSection/>
    </section>

    <Footer/>
    </main>
  )
}

export default page