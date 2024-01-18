import { FC } from 'react'
import { Link, useRouteError } from 'react-router-dom'

import Button from '../ui/Button'
import GoogleLogo from '../assets/google.png'

const ErrorPage: FC = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div className='flex h-[100dvh] flex-col items-center justify-center'>
      <img src={GoogleLogo} alt='Google logo' />
      <h1 className='mb-3'>Something went wrong...</h1>
      <Link to='/calendar' replace><Button>Back to Calendar</Button></Link>
    </div>
  )
}

export default ErrorPage
