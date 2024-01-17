import { useShallow } from 'zustand/react/shallow'
import { format } from 'date-fns'

import useSelectedMonthStore from '../../stores/selectedMonthStore'
import { getDaysInCalendar, groupEventsByDate } from '../../utils/helpers'
import useMouseWheel from '../../hooks/useMouseWheel'

import Square from './CalendarSquare'
import useEventStore from '../../stores/eventStore'

function CalendarGrid () {
  const { selectedMonth, decrementMonth, incrementMonth } = useSelectedMonthStore(
    useShallow(state => ({
      selectedMonth: state.selectedMonth,
      decrementMonth: state.decrementMonth,
      incrementMonth: state.incrementMonth
    }))
  )

  const daysInMonth = getDaysInCalendar(selectedMonth)

  const events = useEventStore(state => state.events)

  const eventsByDate = groupEventsByDate(events)

  console.log(eventsByDate)

  const handleMouseWheel = useMouseWheel({
    onMouseWheelUp: incrementMonth,
    onMouseWheelDown: decrementMonth
  })

  return (
    <div
      className='grid
                 h-full
                 w-full
                 grid-cols-[repeat(7,1fr)]
                 grid-rows-[repeat(5,1fr)]
                 border
                 border-t-0
                 border-hairline
                 bg-hairline'
      onWheel={handleMouseWheel}
    >
      {daysInMonth.map((day, index) => (
        <Square
          key={day.getTime()}
          day={day}
          dayEvents={eventsByDate[format(day, 'y-MM-dd')]}
          showDayName={index < 7}
        />
      ))}
    </div>
  )
}

export default CalendarGrid
