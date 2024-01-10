import React, { useEffect, useState } from 'react'
import { SelectedMonthContext } from './selectedMonthContext'
import { addMonths, format, subMonths } from 'date-fns'

function SelectedMonthProvider ({ children }: { children: React.ReactElement }) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(() => new Date())

  const incrementMonth = () => setSelectedMonth((month) => addMonths(month, 1))
  const decrementMonth = () => setSelectedMonth((month) => subMonths(month, 1))
  const goToCurrentMonth = () => setSelectedMonth(new Date())

  useEffect(() => {
    document.title = `Google Calendar Clone - ${format(selectedMonth, 'MMM yyyy')}`
  }, [selectedMonth])

  const value = {
    selectedMonth,
    incrementMonth,
    decrementMonth,
    goToCurrentMonth
  }

  return (
    <SelectedMonthContext.Provider value={value}>
      {children}
    </SelectedMonthContext.Provider>
  )
}

export default SelectedMonthProvider
