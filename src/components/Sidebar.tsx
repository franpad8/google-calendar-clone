import { FC } from 'react'
import MiniCalendar from './calendar/MiniCalendar'
import CreateEventButton from './events/CreateEventButton'

const Sidebar: FC = () => {
  return (
    <div className='flex flex-col gap-3 px-7 py-3'>
      <div><CreateEventButton /></div>
      <MiniCalendar />
    </div>
  )
}

export default Sidebar
