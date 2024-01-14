import { twJoin } from 'tailwind-merge'
import { type EventType } from '../../types/event'
import { isMultiDayEvent } from '../../utils/helpers'

interface PropsType {
  event: EventType
}

function EventItem ({ event }: PropsType) {
  return (
    <li className={twJoin('cursor-pointer truncate text-wrap leading-3 ' +
                            'rounded-[4px] bg-sky-500 px-2 py-1 text-xs ' +
                            'text-white transition hover:bg-sky-600 hover:text-slate-100',
    isMultiDayEvent(event) ? 'w-[100%] rounded-none' : 'w-[95%]'
    )}
    >{event.title}
    </li>
  )
}

export default EventItem
