import { HiX } from 'react-icons/hi'
import { format } from 'date-fns'

import Square from './Square'
import Modal from './Modal'
import CreateEventForm from './CreateEventForm'
import IconButton from './IconButton'
import useSelectedMonthStore from '../stores/selectedMonthStore'
import { useShallow } from 'zustand/react/shallow'
import useMouseWheel from '../hooks/useMouseWheel'
import { getDaysInCalendar } from '../utils/helpers'
import useModal from '../hooks/useModal'
import useEventPreviewStore from '../stores/eventPreviewStore'

function Calendar () {
  const { selectedMonth, decrementMonth, incrementMonth } = useSelectedMonthStore(
    useShallow(state => ({
      selectedMonth: state.selectedMonth,
      decrementMonth: state.decrementMonth,
      incrementMonth: state.incrementMonth
    }))
  )

  const { close: closeModal } = useModal()
  const { reset } = useEventPreviewStore()
  const handleMouseWheel = useMouseWheel({
    onMouseWheelUp: incrementMonth,
    onMouseWheelDown: decrementMonth
  })

  const [
    daysBeforeStartOfMonth,
    daysInMonth,
    daysAfterEndOfMonth
  ] = getDaysInCalendar(selectedMonth)

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (
    <>
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
        {daysBeforeStartOfMonth.map(day => (
          <Square
            key={day.getTime()}
            day={day}
            showDayName
          />
        )
        )}
        {daysInMonth.map(day => {
          const dayOfMonthNumber = Number(format(day, 'd'))
          const dayOfWeekNumber = Number(format(day, 'i'))
          return (
            <Square
              key={day.getTime()}
              day={day}
              showDayName={dayOfMonthNumber <= dayOfWeekNumber}
            />
          )
        })}
        {daysAfterEndOfMonth.map(day => (
          <Square
            key={day.getTime()}
            day={day}
            showDayName={false}
          />
        )
        )}
      </div>

      <Modal.Window windowId='eventCreation' onClickOutside={handleCloseModal}>
        <>
          <div className='flex items-center justify-end bg-slate-100 px-3'>
            <Modal.Close onClose={handleCloseModal}><IconButton IconElement={HiX} /></Modal.Close>
          </div>

          <div className='p-5'>
            <CreateEventForm modalMode />
          </div>
        </>
      </Modal.Window>
    </>
  )
}

export default Calendar
