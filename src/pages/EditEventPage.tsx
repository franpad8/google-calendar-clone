import { FC } from 'react'
import CreateEventForm from '../components/events/CreateEventForm'
import { useNavigate, useParams } from 'react-router-dom'
import useEventStore from '../stores/eventStore'
import { EventType } from '../types/event'
import NotFoundPage from './NotFound'

const EditEventPage: FC = () => {
  const params = useParams()
  const getEventById = useEventStore(state => state.getEventById)
  const navigate = useNavigate()

  const event: EventType | null = getEventById(params.eventId as string)

  if (!event) return <NotFoundPage />

  return (
    <div className='md:w-[40%]'>
      <CreateEventForm
        modalMode={false}
        event={event}
        afterCreate={() => navigate('/calendar')}
      />
    </div>
  )
}

export default EditEventPage
