import CalendarGrid from './CalendarGrid'
import CreateEventModal from '../events/CreateEventModal'
import EventDetailModal from '../events/EventDetailModal'

function Calendar () {
  return (
    <>
      <CalendarGrid />
      <CreateEventModal />
      <EventDetailModal />
    </>
  )
}

export default Calendar
