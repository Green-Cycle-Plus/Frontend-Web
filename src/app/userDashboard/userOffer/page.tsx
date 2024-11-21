import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'

const Offers = () => {
  const userCard = [
    {
      title: '500kg Of Glass',
      price: '10,000 tokens',
      location: 'Abuja',
      Quantity: 500,
      waste: 'Glass',
    },
    {
      title: '500kg Of Cardboard',
      price: '2,000',
      location: 'Abuja',
      Quantity: 500,
      waste: 'Glass',
    }
  ]
  return (
    <div>
      <div className='flex justify-between w-11/12 mx-auto'>
      <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Offers</h1>
      <Button>Add +</Button>
      </div>
      <div className='grid grid-cols-2'>
       {
        userCard.map((user, index) => (
          <div key={index}>
            <div className='flex justify-between'>
              <h1>{user.title}</h1>
              <EllipsisVertical />
            </div>
          </div>
        ))
       }
      </div>
    </div>
  )
}

export default Offers
