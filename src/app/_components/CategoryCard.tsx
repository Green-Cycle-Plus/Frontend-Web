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
    <div>
      {
        category.map((item, index) => (
            <div key={index} className='flex'>
                <div>
                <Image src={item.img} height={100} width={100} alt='plasctic'/>
                <h1>{item.name}</h1>
                <p>{item.company}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default CategoryCard
