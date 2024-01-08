import { ReactElement } from 'react'
import Header from './components/Header'

function AppLayout (): ReactElement {
  return (
    <div className='grid grid-cols-[20rem_1fr] h-screen grid-rows-[5rem_1fr]'>
      <Header />
      <div className='h-full'>SIDEBAR</div>
      <main className='bg-slate-500'>CONTENT</main>
    </div>
  )
}

export default AppLayout
