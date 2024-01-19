import { useRef } from 'react'
import useModal from '../../hooks/useModal.ts'
import { format, isToday as isTodayFns, isWithinInterval } from 'date-fns'
import useEventPreviewStore from '../../stores/eventPreviewStore.ts'
import EventItem from '../events/EventItem.tsx'
import { useShallow } from 'zustand/react/shallow'
import { type EventType } from '../../types/event.ts'
interface SquareProps {
  day: Date,
  dayEvents: EventType[],
  showDayName: boolean,
}

function Square ({ day, dayEvents, showDayName }: SquareProps) {
  const {
    previewEventStartDay,
    previewEventEndDay,
    setPreviewEventStartDay,
    setPreviewEventEndDay,
    previewEventTitle
  } = useEventPreviewStore(useShallow(state => ({
    previewEventStartDay: state.startDay,
    previewEventEndDay: state.endDay,
    setPreviewEventStartDay: state.setStartDay,
    setPreviewEventEndDay: state.setEndDay,
    previewEventTitle: state.title
  })))

  const { open: openModal } = useModal()
  const containerElementRef = useRef<HTMLDivElement>(null)

  const isToday:boolean = isTodayFns(day)
  const dayName = format(day, 'eee')
  const dayNumber = day.getDate() === 1
    ? format(day, 'MMM d')
    : format(day, 'd')

  const style = isToday ? 'bg-blue-600 text-white' : ''

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

    setPreviewEventStartDay(day)
    setPreviewEventEndDay(day)
    openModal('eventCreation', { ...modalWidthStyle, ...modalHeightStyle })
  }

  return (
    <>
      <div
        id={`square-${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
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
        {showDayName && (
          <span className='text-[11px] font-semibold uppercase text-slate-500'>
            {dayName}
          </span>
        )}
        <span className={`h-6 min-w-6 rounded-full text-center text-xs font-medium leading-6 ${style}`}>
          {dayNumber}
        </span>
        <ul className='flex w-full flex-col gap-1'>
          {
            dayEvents?.map(event => <EventItem key={day.toString() + '_' + event.id} event={event} day={day} />)
          }

          {
            previewEventStartDay &&
            previewEventEndDay &&
            isWithinInterval(day, { start: previewEventStartDay, end: previewEventEndDay })
              ? <EventItem
                  event={{
                    id: '99999999',
                    title: previewEventTitle === '' ? '(Untitled)' : previewEventTitle,
                    startDate: format(previewEventStartDay, 'yyyy-MM-dd'),
                    endDate: format(previewEventEndDay, 'yyyy-MM-dd')
                  }}
                  day={day}
                />
              : null
          }
        </ul>
      </div>
    </>
  )
}

export default Square
