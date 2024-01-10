import React from 'react'
import MonthSelector from './MonthSelector'
import CalendarLogo from '../assets/calendar_2x.png'

function Header (): React.ReactElement {
  return (
    <header className='col-span-2
                       flex
                       items-center
                       gap-10
                       border-b
                       border-b-hairline'
    >
      <div className='flex
                      h-full
                      items-center
                      gap-2'
      >
        <img src={CalendarLogo} alt='Google Calendar logo' width={40} height={40} />
        <h1 className='select-none font-display text-[22px]'>Calendar</h1>
      </div>
      <MonthSelector />
    </header>
  )
}

export default Header
