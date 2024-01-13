import React, { useRef } from 'react'
import useModal from '../hooks/useModal'
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
  const { open: openModal } = useModal()
  const containerElementRef = useRef<HTMLDivElement>(null)

  const style = isToday ? 'bg-blue-600 text-white' : ''
  const events: [EventType] = [
    { title: 'Go to gym' }
  ]

  function handleClick () {
    const container = containerElementRef.current
    if (!container) return

    const [containerX, containerY] = [container.offsetLeft, container.offsetTop]
    const containerWidth = container.offsetWidth
    const [viewportWidth, viewportHeight] = [window.innerWidth, window.innerHeight]

    const modalWidthStyle = (containerX > viewportWidth / 2)
      ? { right: `${viewportWidth - containerX}px` }
      : { left: `${containerX + containerWidth}px` }

    const modalHeightStyle = (containerY > viewportHeight / 2)
      ? { bottom: `${viewportHeight - containerY}px` }
      : { top: `${containerY}px` }

    openModal('eventCreation', { ...modalWidthStyle, ...modalHeightStyle })
  }

  return (
    <>
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
        onClick={handleClick}
        ref={containerElementRef}
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
    </>
  )
}

export default Square
