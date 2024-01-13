import React from 'react'
import Modal from './Modal'

interface SquareProps {
  dayName?: string
  dayNumber: string
  isToday?: boolean
}

interface EventType {
  title: string
}

function Square ({
  dayName,
  dayNumber,
  isToday = false
}: SquareProps): React.ReactElement {
  const style = isToday ? 'bg-blue-600 text-white' : ''
  const events: [EventType] = [
    { title: 'Go to gym' }
  ]

  return (
    <>
      <Modal.Open opens='eventCreation'>
        <div
          className='flex flex-col
                  items-center
                  gap-1
                  border-b
                  border-r
                  border-solid
                  border-b-hairline
                  border-r-hairline
                  bg-white
                  py-2'
        >
          {dayName && (
            <span className='text-[11px] font-semibold uppercase text-slate-500'>
              {dayName}
            </span>
          )}
          <span className={`h-6 min-w-6 rounded-full text-center text-xs font-medium leading-6 ${style}`}>
            {dayNumber}
          </span>
          <ul className='flex w-full flex-col'>
            {
              events.map(event => (
                <li
                  key={event.title}
                  className='hover:
                              w-[95%]
                              cursor-pointer
                              rounded-[4px]
                              bg-sky-500
                              px-2
                              py-1
                              text-xs
                              leading-3
                              text-white
                              hover:bg-sky-600
                              hover:text-slate-100'
                >{event.title}
                </li>
              ))
            }
          </ul>
        </div>
      </Modal.Open>
    </>
  )
}

export default Square
