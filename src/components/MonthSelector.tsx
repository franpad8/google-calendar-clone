import React, { MouseEvent } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { format } from 'date-fns'
import { useSelectedMonth } from '../contexts/selectedMonthContext'
import Button from './Button'
import IconButton from './IconButton'

function MonthSelector (): React.ReactElement {
  const { selectedMonth, decrementMonth, incrementMonth, goToCurrentMonth } = useSelectedMonth()

  const todayDate = format(selectedMonth, 'MMMM yyy')

  function onPreviousMonthClick (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    decrementMonth()
  }

  function onNextMonthClick (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    incrementMonth()
  }

  function onTodayClick () {
    goToCurrentMonth()
  }

  return (
    <div className='flex items-center gap-4'>
      <Button
        className='border border-hairline'
        variation='secondary'
        onClick={onTodayClick}
      >
        Today
      </Button>
      <div className='flex gap-2'>
        <IconButton IconElement={HiOutlineChevronLeft} onClick={onPreviousMonthClick} />
        <IconButton IconElement={HiOutlineChevronRight} onClick={onNextMonthClick} />
      </div>
      <span className='select-none font-display text-[22px]'>{todayDate}</span>
    </div>
  )
}

export default MonthSelector
