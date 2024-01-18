import { FC } from 'react'
import { Link } from 'react-router-dom'

import GoogleLogo from '../assets/google.png'
import Button from '../ui/Button'

const NotFoundPage: FC = () => {
  return (
    <div className='flex h-[100dvh] flex-col items-center justify-center'>
      <img src={GoogleLogo} alt='Google logo' />
      <h1><b>404</b>. Page not found</h1>
      <p className='mb-3'>The URL you request has not been found</p>
      <Link to='/calendar' replace><Button>Back to Calendar</Button></Link>
    </div>
  )
}

export default NotFoundPage
