import React, { MouseEvent } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { format } from 'date-fns'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import useSelectedMonthStore from '../stores/selectedMonthStore'

function MonthSelector (): React.ReactElement {
  const {
    selectedMonth,
    decrementMonth,
    incrementMonth,
    goToCurrentMonth
  } = useSelectedMonthStore(state => state)

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
      <div className='flex gap-[0.2rem]'>
        <IconButton IconElement={HiOutlineChevronLeft} onClick={onPreviousMonthClick} />
        <IconButton IconElement={HiOutlineChevronRight} onClick={onNextMonthClick} />
      </div>
      <span className='select-none font-display text-[22px]'>{todayDate}</span>
    </div>
  )
}

export default MonthSelector
