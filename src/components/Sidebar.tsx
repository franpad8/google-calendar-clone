import { FC } from 'react'
import MiniCalendar from './calendar/MiniCalendar'
import CreateEventButton from './events/CreateEventButton'
import Clock from './Clock'

const Sidebar: FC = () => {
  return (
    <div className='flex h-full flex-col justify-between px-7 py-4'>
      <div className='flex flex-col gap-4'>
        <div><CreateEventButton /></div>
        <MiniCalendar />
        <div className='mt-4'><Clock /></div>
      </div>
      <h2 className='text-center text-sm'>
        Clone made by <a className='font-bold italic' href='https://github.com/franpad8' target='_blank' rel='noreferrer'>Franklin Padilla</a>
      </h2>
    </div>
  )
}

export default Sidebar
