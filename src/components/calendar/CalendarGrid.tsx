import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { format } from 'date-fns'

import useSelectedMonthStore from '../../stores/selectedMonthStore'
import { getDaysInCalendar } from '../../utils/helpers'
import useMouseWheel from '../../hooks/useMouseWheel'
import { EventDataType } from '../../types/event'

import eventsData from '../../mocks/events.json'
import Square from './CalendarSquare'

function CalendarGrid () {
  const { selectedMonth, decrementMonth, incrementMonth } = useSelectedMonthStore(
    useShallow(state => ({
      selectedMonth: state.selectedMonth,
      decrementMonth: state.decrementMonth,
      incrementMonth: state.incrementMonth
    }))
  )

  const daysInMonth = getDaysInCalendar(selectedMonth)

  const [events] = useState<EventDataType>(() => eventsData)

  const handleMouseWheel = useMouseWheel({
    onMouseWheelUp: incrementMonth,
    onMouseWheelDown: decrementMonth
  })

  return (
    <div
      className='grid
                 h-full
                 w-full grid-cols-[repeat(7,1fr)]
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
          dayEvents={events[format(day, 'y-MM-dd')]}
          showDayName={index < 7}
        />
      ))}
    </div>
  )
}

export default CalendarGrid
