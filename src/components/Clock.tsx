import { format } from 'date-fns'
import { FC, ReactNode, useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'

const TimeIcon: FC = () => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  return (
    currentHour > 6 && currentHour < 19
      ? <HiSun className='h-5 w-5 text-yellow-300' />
      : <HiMoon className='h-5 w-5' />
  )
}

export default function Clock () : ReactNode {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='flex items-center justify-between text-sm'>
      <span>{format(currentTime, 'O')}</span>
      <div className='flex items-center gap-2'>
        <span>{format(currentTime, 'HH:mm')}</span>
        <TimeIcon />
      </div>
    </div>
  )
}
