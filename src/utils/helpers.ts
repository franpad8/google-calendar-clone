import { addDays, eachDayOfInterval, endOfMonth, format, startOfMonth, subDays } from 'date-fns'
import { type EventType } from '../types/event'

export function getDaysInCalendar (month: Date) : Date[] {
  const startMonth = startOfMonth(month)
  const endMonth = endOfMonth(month)

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

  return daysBeforeStartOfMonth.concat(daysInMonth).concat(daysAfterEndOfMonth)
}

export function isMultiDayEvent (event: EventType) {
  return event.startDate !== event.endDate
}

export function groupEventsByDate (events: EventType[]): {[key: string]: EventType[]} {
  const groupedBy = {} as {[key: string]: EventType[]}
  events.forEach(event => {
    const eventDays = eachDayOfInterval({
      start: new Date(event.startDate + 'T00:00:00'),
      end: new Date(event.endDate + 'T00:00:00')
    })

    eventDays.forEach(day => {
      const date: string = format(day, 'yyyy-MM-dd')
      if (!groupedBy[date]) {
        groupedBy[date] = [event]
      } else {
        groupedBy[date] = [...groupedBy[date], event]
      }
    })
  })

  return groupedBy
}

export function toDate (dateString: string) {
  return new Date(dateString + 'T00:00:00')
}
