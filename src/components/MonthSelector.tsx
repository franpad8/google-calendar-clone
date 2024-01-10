import React from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { format } from 'date-fns'
import { useSelectedMonth } from '../contexts/selectedMonthContext'

function MonthSelector (): React.ReactElement {
  const { selectedMonth, decrementMonth, incrementMonth, goToCurrentMonth } = useSelectedMonth()

  const todayDate = format(selectedMonth, 'MMMM yyy')

  function onPreviousMonthClick (e: Event) {
    e.preventDefault()
    decrementMonth()
  }

  function onNextMonthClick (e: Event) {
    e.preventDefault()
    incrementMonth()
  }

  function onTodayClick () {
    goToCurrentMonth()
  }

  return (
    <div className='flex items-center gap-4'>
      <button
        className='select-none
                   border
                   border-hairline
                   px-4
                   py-2
                   text-sm
                   font-medium
                   hover:bg-slate-100'
        onClick={onTodayClick}
      >
        Today
      </button>
      <div className='flex gap-2'>
        <HiOutlineChevronLeft
          className='h-[25px]
                     w-[25px]
                     cursor-pointer rounded-full
                     p-[4px]
                     hover:bg-slate-100'
          onClick={onPreviousMonthClick}
        />
        <HiOutlineChevronRight
          className='h-[25px]
                     w-[25px]
                     cursor-pointer
                     rounded-full
                     p-[4px]
                     hover:bg-slate-100'
          onClick={onNextMonthClick}
        />
      </div>
      <span className='select-none font-display text-[22px]'>{todayDate}</span>
    </div>
  )
}

export default MonthSelector
