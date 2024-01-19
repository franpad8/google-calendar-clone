import { FC, MouseEventHandler, useState } from 'react'
import { getDaysInCalendar } from '../../utils/helpers'
import { twMerge } from 'tailwind-merge'
import { addMonths, format, isSameDay, isSameMonth, startOfMonth, subMonths } from 'date-fns'
import IconButton from '../../ui/IconButton'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'

const MiniCalendar: FC = () => {
  const params = useParams()

  const selectedDay = params.year && params.month && params.day
    ? new Date(`${params.year}-${params.month}-${params.day}`)
    : new Date()

  const [selectedMonth, setSelectedMonth] = useState<Date>(() => startOfMonth(selectedDay))
  const navigate = useNavigate()

  const daysInMonth: Date[] = getDaysInCalendar(selectedMonth)
  const daysOfWeek = [
    { name: 'Monday', label: 'M' },
    { name: 'Tuesday', label: 'T' },
    { name: 'Wednesday', label: 'X' },
    { name: 'Thursday', label: 'T' },
    { name: 'Friday', label: 'F' },
    { name: 'Saturday', label: 'S' },
    { name: 'Sunday', label: 'S' }]
  const today = new Date()

  const onPreviousMonthClick: MouseEventHandler = () => {
    setSelectedMonth(current => subMonths(current, 1))
  }

  const onNextMonthClick: MouseEventHandler = () => {
    setSelectedMonth(current => addMonths(current, 1))
  }

  const onSelectDay = (day: Date) : void => {
    setSelectedMonth(startOfMonth(day))
    navigate(`/calendar/${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between px-[2px]'>
        <span className='select-none text-nowrap font-display text-sm text-black'>
          {format(selectedMonth, 'MMMM yyyy')}
        </span>
        <div className='flex gap-[0.2rem]'>
          <IconButton size='xs' IconElement={HiOutlineChevronLeft} onClick={onPreviousMonthClick} />
          <IconButton size='xs' IconElement={HiOutlineChevronRight} onClick={onNextMonthClick} />
        </div>
      </div>
      <ul className='grid w-full grid-cols-7 gap-y-5 text-[9px]'>
        {
        daysOfWeek.map(day =>
          <li
            key={day.name}
            className='select-none p-1'
            title={day.name}
          >
            {day.label}
          </li>
        )
      }
        {
        daysInMonth.map(day => (
          <li
            key={day.getTime()}
            onClick={() => onSelectDay(day)}
          >
            <span
              className={twMerge(
                'select-none',
                'cursor-pointer',
                'rounded-full',
                'p-[6px]',
                isSameMonth(day, selectedMonth) ? 'font-bold' : '',
                'hover:bg-slate-200',
                isSameDay(day, selectedDay) ? 'bg-blue-200 hover:bg-blue-300' : '',
                isSameDay(day, today) ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
                isSameDay(day, today) && isSameDay(day, selectedDay) ? 'bg-blue-600' : ''
              )}
            >
              {day.getDate()}
            </span>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default MiniCalendar
