import { FC, MouseEventHandler } from 'react'
import PlusLogo from '../../ui/PlusLogo'
import { useParams } from 'react-router-dom'
import useSelectedMonthStore from '../../stores/selectedMonthStore'

const CreateEventButton: FC = () => {
  const params = useParams()
  const setSelectedMonth = useSelectedMonthStore(store => store.setSelectedMonth)

  const handleClick: MouseEventHandler = async () => {
    const selectedDay = params.year && params.month && params.day
      ? new Date(`${params.year}-${params.month}-${params.day}`)
      : new Date()

    await setSelectedMonth(selectedDay)

    const selectedCalendarSquare =
      document.getElementById(`square-${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`)

    if (selectedCalendarSquare) {
      selectedCalendarSquare.click()
    }
  }

  return (
    <button
      className='rounded-full
                       border
                       shadow-md
                       transition-all
                       hover:scale-105
                       hover:bg-slate-50
                       hover:shadow-xl
                       active:bg-slate-200'
      type='button'
      onClick={handleClick}
    >
      <div className='flex
                      items-center
                      justify-between
                      gap-3
                      py-1
                      pl-2
                      pr-6'
      >
        <PlusLogo />
        <h3 className='font-display text-sm text-black'>Create</h3>
      </div>
    </button>
  )
}

export default CreateEventButton
