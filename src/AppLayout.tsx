import { ReactElement } from 'react'
import Header from './components/Header'
import Calendar from './components/Calendar'
import Modal from './components/Modal'
import useToggleSidebarStore from './stores/toggleSidebarStore'
import { twJoin } from 'tailwind-merge'

function AppLayout (): ReactElement {
  const showSidebar = useToggleSidebarStore(state => state.showSidebar)

  const containerClasses = twJoin(
    'grid h-screen grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] transition-all',
    showSidebar ? 'grid-cols-[16rem_1fr]' : 'grid-cols-[1px_1fr]'
  )

  return (
    <div className={containerClasses}>
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
