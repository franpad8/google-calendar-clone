import { addDays, eachDayOfInterval, endOfMonth, format, startOfMonth, subDays } from 'date-fns'

export function getDaysInCalendar (month: Date) : [Date[], Date[], Date[]] {
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

  return [daysBeforeStartOfMonth, daysInMonth, daysAfterEndOfMonth]
}
