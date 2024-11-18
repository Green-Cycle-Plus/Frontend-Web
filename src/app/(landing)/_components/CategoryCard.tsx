import Image from 'next/image'
import React from 'react'

const CategoryCard = () => {
    const category = [
        {
            img: "/plastic.svg",
            name:"Plastic",
            company:"50 Companies",
        },
        {
            img: "/metal.svg",
            name:"Metals",
            company:"50 Companies",
        },
        {
            img: "/battery.svg",
            name:"Batteries",
            company:"50 Companies",
        },
        {
            img: "glass.svg",
            name:"Glass",
            company:"50 Companies",
        }
    ]
  return (
    <div className=" w-full p-10 justify-center bg-[#E8F7E8] mx-auto grid grid-cols-1 gap-y-8 sm:gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 mt-4 sm:mt-8 sm:px-8 pb-20">
      {
        category.map((item, index) => (
            <div key={index} className='bg-white flex justify-center p-10 rounded-lg h-[275.34px]'>
                <div>
                <div className='bg-gradient-to-r from-[#DAFFDA] to-[#237823] px-10 py-2 h-[150px] rounded-lg w-[245.05px]'>
                <Image src={item.img} height={200} width={200} alt='plasctic' className='bottom-0'/>
                </div>
                <div className='mt-5'>
                 <h1 className='font-bold'>{item.name}</h1>
                 </div>
                <div className='mt-2'>
                <p>{item.company}</p>
                </div>
                </div>
                
            </div>
        ))
      }
    </div>
  )
}

export default CategoryCard
