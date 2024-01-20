import { twJoin } from 'tailwind-merge'
import { type EventType } from '../../types/event'
import { isMultiDayEvent } from '../../utils/helpers'
import { MouseEventHandler } from 'react'
import useSelectedEventStore from '../../stores/selectedEventStore'
import useModal from '../../hooks/useModal'
import { format } from 'date-fns/format'

interface PropsType {
  event: EventType
  day: Date
}

function EventItem ({ event, day }: PropsType) {
  const setSelectedEvent = useSelectedEventStore(state => state.setSelectedEvent)
  const { open: openModal } = useModal()

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    setSelectedEvent(event)
    openModal('eventDetail')
  }

  const isEventFirstDay = format(day, 'yyyy-MM-dd') === event.startDate
  const isEventLastDay = format(day, 'yyyy-MM-dd') === event.endDate

  const classes =
  isMultiDayEvent(event)
    ? isEventFirstDay
      ? 'w-[101%] rounded-r-none'
      : isEventLastDay
        ? 'w-[95%] rounded-l-none'
        : 'w-[101%] rounded-none'
    : 'w-[95%]'

  return (
    <li>
      <button
        className={
          twJoin('cursor-pointer truncate text-wrap leading-3 ' +
                  'rounded-[4px] bg-sky-500 px-2 py-1 text-xs text-left ' +
                  'text-white transition hover:bg-sky-600 hover:text-slate-100 ',
          classes)
}
        onClick={handleClick}
      >
        {event.title}
      </button>
    </li>
  )
}

export default EventItem
