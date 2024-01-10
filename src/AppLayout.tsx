import { ReactElement } from 'react'
import Header from './components/Header'
import Calendar from './components/Calendar'

function AppLayout (): ReactElement {
  return (
    <div className='grid
                    h-screen
                    grid-cols-[20rem_1fr]
                    grid-rows-[4rem_1fr]'
    >
      <Header />
      <div className='h-full'>SIDEBAR</div>
      <main>
        <Calendar />
      </main>
    </div>
  )
}

export default AppLayout
