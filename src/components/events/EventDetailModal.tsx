import { HiOutlineLocationMarker, HiOutlineMenuAlt2, HiOutlineTrash, HiX } from 'react-icons/hi'
import IconButton from '../../ui/IconButton'
import Modal from '../../ui/Modal'
import useSelectedEventStore from '../../stores/selectedEventStore'
import useEventStore from '../../stores/eventStore'
import { MouseEventHandler } from 'react'
import { EventType } from '../../types/event'
import { isMultiDayEvent, toDate } from '../../utils/helpers'
import { format } from 'date-fns'

function formatEventDate (event: EventType) {
  const startDate = toDate(event.startDate)
  const endDate = toDate(event.endDate)

  if (isMultiDayEvent(event)) {
    return `${format(startDate, 'PPP')} - ${format(endDate, 'PPP')}`
  }

  return format(startDate, 'PPP')
}

function EventDetailModal () {
  const selectedEvent = useSelectedEventStore(state => state.selectedEvent)
  const deleteEvent = useEventStore(state => state.deleteEvent)

  const handleDeletion: MouseEventHandler = () => {
    if (selectedEvent) deleteEvent(selectedEvent.id)
  }

  if (!selectedEvent) return null

  return (
    <Modal.Window windowId='eventDetail' withBackground draggable>
      <>
        <div className='handle
                      flex
                      w-[32rem]
                      cursor-move
                      items-center
                      justify-end
                      gap-2
                      p-3'
        >
          <Modal.Close>
            <div className='flex gap-3'>
              <IconButton IconElement={HiOutlineTrash} title='Delete this event' onClick={handleDeletion} />
              <IconButton IconElement={HiX} />
            </div>
          </Modal.Close>
        </div>

        <div className='grid grid-cols-[60px_1fr] items-center gap-y-3 pb-8 pt-4'>
          <div className='col-start-2 mb-4'>
            <h1 className=' select-none font-display text-[22px]'>{selectedEvent?.title}</h1>
            <span>{formatEventDate(selectedEvent)}</span>
          </div>

          {
            selectedEvent.location && (
              <>
                <HiOutlineLocationMarker className='h-[1.3rem] w-[1.3rem] justify-self-center' />
                <span>{selectedEvent.location}</span>
              </>
            )
          }

          {
            selectedEvent.description && (
              <>
                <HiOutlineMenuAlt2 className='h-[1.3rem] w-[1.3rem] justify-self-center' />
                <p className='text-wrap text-justify'>{selectedEvent.description}</p>
              </>
            )
          }
        </div>
      </>
    </Modal.Window>
  )
}

export default EventDetailModal
