import { FC } from 'react'
import MiniCalendar from './calendar/MiniCalendar'
import CreateEventButton from './events/CreateEventButton'
import Clock from './Clock'

const Sidebar: FC = () => {
  return (
    <div className='flex flex-col gap-4 px-7 py-3'>
      <div><CreateEventButton /></div>
      <MiniCalendar />
      <div className='mt-4'><Clock /></div>
    </div>
  )
}

export default Sidebar
