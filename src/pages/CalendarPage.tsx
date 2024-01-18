import CalendarGrid from '../components/calendar/CalendarGrid'
import CreateEventModal from '../components/events/CreateEventModal'
import EventDetailModal from '../components/events/EventDetailModal'

function CalendarPage () {
  return (
    <>
      <CalendarGrid />
      <CreateEventModal />
      <EventDetailModal />
    </>
  )
}

export default CalendarPage
