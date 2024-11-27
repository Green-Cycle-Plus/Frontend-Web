"use client"
import { useState } from "react"
import WeeklyStreak from '@/app/(landing)/_components/Streak'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Rewards = () => {
  const [streak, setStreak] = useState(1)

  const incrementStreak = () => {
    if (streak < 7) {
      setStreak(streak + 1)
    }
  }

  return (
    <div className='ml-5'>
      <div>
        <h1 className="text-4xl text-[#285528]">Rewards</h1>
      </div>
      <div className='shadow-lg w-[500px] mt-10 p-5'>
        <h1 className='font-bold mt-5'>Streak</h1>
        <div className='flex justify-center'>
          <Image src='/fire.svg' height={90} width={90} alt='fire' className='mt-5' />
        </div>
        <div className='flex justify-center'>
          <div>
            <h1 className='flex justify-center text-4xl font-bold mt-5'>{streak}</h1>
            <h1 className='flex justify-center text-gray-600 mt-2'>
              {streak === 1 ? 'Day Streak' : 'Days Streak'}
            </h1> 
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <WeeklyStreak  />
        </div>       
      </div>
      <div>
        <Button 
          className='w-[500px] mt-5 h-16' 
          onClick={incrementStreak}
          disabled={streak === 7}
        >
          {streak === 7 ? 'Streak Complete!' : 'Claim Streak'}
        </Button>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-3">Badges</h1>
        <div>
          <Image src='/badge.png' height={100} width={200} alt='badge' />
        </div>
      </div>
    </div>
  )
}

export default Rewards


