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
import { useSelectedMonth } from '../contexts/selectedMonthContext'

function Calendar () {
  const { selectedMonth } = useSelectedMonth()
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

  return (
    <div
      className='grid
                 h-full
                 w-full grid-cols-[repeat(7,1fr)]
                 grid-rows-5
                 border
                 border-t-0
                 border-hairline
                 bg-hairline'
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
  )
}

export default Calendar
