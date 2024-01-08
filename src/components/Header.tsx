import React from 'react'
import MonthSelector from './MonthSelector'

function Header (): React.ReactElement {
  return (
    <header className='col-span-2 flex items-center border-b-hairline border-b'>
      <MonthSelector />
    </header>
  )
}

export default Header
