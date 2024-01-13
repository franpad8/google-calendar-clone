import React, { useEffect } from 'react'
import AppLayout from './AppLayout'
import useSelectedMonthStore from './stores/selectedMonthStore'
import { format } from 'date-fns'

function App (): React.ReactElement {
  const selectedMonth = useSelectedMonthStore(store => store.selectedMonth)

  useEffect(
    () => {
      document.title = `Google Calendar Clone - ${format(selectedMonth, 'MMM yyy')}`
    },
    [selectedMonth]
  )

  return (
    <AppLayout />
  )
}

export default App
