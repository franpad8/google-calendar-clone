import React, { FC, useEffect } from 'react'
import AppLayout from './AppLayout'
import useSelectedMonthStore from './stores/selectedMonthStore'
import { format } from 'date-fns'
import { Navigate, createBrowserRouter, RouterProvider, useParams, Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import NotFoundPage from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'
import CalendarPage from './pages/CalendarPage'

const ErrorBoundaryLayout: FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Outlet />
    </ErrorBoundary>
  )
}

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to='/calendar' replace />
          },
          {
            path: '/calendar',
            element: <CalendarPage />
          },
          {
            path: '/calendar/:year/:month/:day',
            element: <PathValidation />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }

])

function PathValidation () {
  const params = useParams()
  const date = new Date(`${params.year}-${params.month}-${params.day}`)

  if (!date.getTime()) { return <Navigate to='/calendar' replace /> }

  return <CalendarPage />
}

function App (): React.ReactElement {
  const selectedMonth = useSelectedMonthStore(store => store.selectedMonth)

  useEffect(
    () => {
      document.title = `Google Calendar Clone - ${format(selectedMonth, 'MMM yyy')}`
    },
    [selectedMonth]
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
