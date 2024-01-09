import React from 'react'
import AppLayout from './AppLayout'
import SelectedMonthProvider from './contexts/selectedMonthProvider'

function App (): React.ReactElement {
  return (
    <SelectedMonthProvider>
      <AppLayout />
    </SelectedMonthProvider>
  )
}

export default App
