import { ReactElement } from 'react'
import Header from './components/Header'
import Calendar from './components/Calendar'
import Modal from './components/Modal'

function AppLayout (): ReactElement {
  return (
    <div className='grid
                    h-screen
                    grid-cols-[16rem_1fr]
                    grid-rows-[4rem_1fr]'
    >
      <Header />
      <div className='h-full'>SIDEBAR</div>
      <main>
        <Modal>
          <Calendar />
        </Modal>
      </main>
    </div>
  )
}

export default AppLayout
