import React from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { format } from 'date-fns'
import { useSelectedMonth } from '../contexts/selectedMonthContext'

function MonthSelector (): React.ReactElement {

  const {selectedMonth, decrementMonth, incrementMonth, goToCurrentMonth} = useSelectedMonth()

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
    <div className='flex gap-8 items-center'>
      <button
        className='py-2 px-4 border
                 border-hairline
                   text-lg
                   font-medium
                 hover:bg-slate-100
                   select-none'
        onClick={onTodayClick}
      >
        Today
      </button>
      <div className='flex gap-1'>
        <HiOutlineChevronLeft
          className='w-[45px]
                     h-[45px]
                     p-3 rounded-full
                     hover:bg-slate-100
                     cursor-pointer'
          onClick={onPreviousMonthClick}
        />
        <HiOutlineChevronRight
          className='w-[45px]
                     h-[45px]
                     p-3
                     rounded-full
                     hover:bg-slate-100
                     cursor-pointer'
          onClick={onNextMonthClick}
        />
      </div>
      <span className='font-display text-2xl select-none'>{todayDate}</span>
    </div>
  )
}

export default MonthSelector
