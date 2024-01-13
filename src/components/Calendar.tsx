import { WheelEvent } from 'react'
import { HiX } from 'react-icons/hi'
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subDays,
  isToday,
  addDays
} from 'date-fns'

import Square from './Square'
import Modal from './Modal'
import CreateEventForm from './CreateEventForm'
import IconButton from './IconButton'
import useSelectedMonthStore from '../stores/selectedMonthStore'
import { useShallow } from 'zustand/react/shallow'

function Calendar () {
  const { selectedMonth, decrementMonth, incrementMonth } = useSelectedMonthStore(
    useShallow(state => ({
      selectedMonth: state.selectedMonth,
      decrementMonth: state.decrementMonth,
      incrementMonth: state.incrementMonth
    }))
  )
  const startMonth = startOfMonth(selectedMonth)
  const endMonth = endOfMonth(selectedMonth)

  const daysInMonth = eachDayOfInterval({
    start: startMonth,
    end: endMonth
  })

  const startMonthDay = Number(format(startMonth, 'i')) - 1
  const daysBeforeStartOfMonth =
    startMonthDay > 0
      ? eachDayOfInterval({
        start: subDays(startMonth, startMonthDay),
        end: subDays(startMonth, 1)
      })
      : []

  const numDaysAfterEndOfMonth = 7 - Number(format(endMonth, 'i'))

  const daysAfterEndOfMonth =
    numDaysAfterEndOfMonth > 0
      ? eachDayOfInterval({
        start: addDays(endMonth, 1),
        end: addDays(endMonth, numDaysAfterEndOfMonth)
      })
      : []

  let lastTime: number = (new Date()).getTime()
  function handleMouseWheel (e: WheelEvent) {
    const currentTime = (new Date()).getTime()
    const deltaTime = currentTime - lastTime

    // We apply a debouncing to avoid the excesive execution
    // of change months function when using the mouse wheel
    if ((deltaTime < 200)) return

    if (e.deltaY > 0) {
      incrementMonth()
    } else {
      decrementMonth()
    }

    lastTime = currentTime
  }

  return (
    <>
      <div
        className='grid
                 h-full
                 w-full grid-cols-[repeat(7,1fr)]
                 border
                 border-t-0
                 border-hairline
                 bg-hairline'
        onWheel={handleMouseWheel}
      >
        {daysBeforeStartOfMonth.map(day => {
          const dayOfMonthNumber = format(day, 'd')

          return (
            <Square
              key={day.getTime()}
              dayName={format(day, 'eee')}
              dayNumber={dayOfMonthNumber}
              isToday={isToday(day)}
            />
          )
        })}
        {daysInMonth.map(day => {
          const dayOfMonthNumber = format(day, 'd')
          const dayOfWeekNumber = format(day, 'i')
          return (
            <Square
              key={day.getTime()}
              dayName={
              Number(dayOfMonthNumber) <= Number(dayOfWeekNumber)
                ? format(day, 'eee')
                : undefined
            }
              dayNumber={
              dayOfMonthNumber === '1' ? format(day, 'MMM d') : dayOfMonthNumber
            }
              isToday={isToday(day)}
            />
          )
        })}
        {daysAfterEndOfMonth.map(day => {
          const dayOfMonthNumber = format(day, 'd')
          return (
            <Square
              key={day.getTime()}
              dayNumber={
              dayOfMonthNumber === '1' ? format(day, 'MMM d') : dayOfMonthNumber
            }
              isToday={isToday(day)}
            />
          )
        })}
      </div>

      <Modal.Window windowId='eventCreation'>
        <>
          <div className='flex h-10 w-[30rem] items-center justify-end bg-slate-100 px-5'>
            <Modal.Close><IconButton IconElement={HiX} /></Modal.Close>
          </div>

          <div className='p-5'>
            <CreateEventForm />
          </div>
        </>
      </Modal.Window>
    </>
  )
}

export default Calendar
