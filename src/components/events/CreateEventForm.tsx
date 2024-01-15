import { useShallow } from 'zustand/react/shallow'
import useEventPreviewStore from '../../stores/eventPreviewStore'
import Button from '../../ui/Button'
import { ChangeEvent, FormEvent } from 'react'
import useModal from '../../hooks/useModal'
import { format } from 'date-fns'
import DateInput from '../../ui/DateInput'
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineMenuAlt2 } from 'react-icons/hi'
import ToggleShowButton from '../../ui/ToggleShowButton'

interface Props {
  modalMode: boolean
}

function CreateEventForm ({ modalMode }: Props) {
  const {
    eventPreviewStartDay,
    eventPreviewEndDay,
    eventPreviewTitle,
    setEventPreviewTitle,
    setEventPreviewStartDay,
    setEventPreviewEndDay,
    resetEventPreview
  } = useEventPreviewStore(useShallow(state => ({
    eventPreviewStartDay: state.startDay,
    setEventPreviewStartDay: state.setStartDay,
    eventPreviewEndDay: state.endDay,
    setEventPreviewEndDay: state.setEndDay,
    eventPreviewTitle: state.title,
    setEventPreviewTitle: state.setTitle,
    resetEventPreview: state.reset
  })))

  const { close: closeModal } = useModal()

  function handleTitleChange (e: ChangeEvent<HTMLInputElement>) {
    setEventPreviewTitle(e.target.value)
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    resetEventPreview()
    if (modalMode) { closeModal() }
  }

  return (
    <form className='overflow-auto' onSubmit={handleSubmit}>
      <div className='grid grid-cols-[60px_1fr] items-center gap-y-3 pr-4'>
        <input
          className='col-start-2
                     col-end-2
                     ml-2
                     mt-6
                     border-b-2
                     border-b-slate-100
                     text-2xl
                     outline-none
                     transition-all
                     placeholder:text-surface/85
                     focus:border-b-blue-600'
          type='text'
          name='title'
          placeholder='Add a title'
          value={eventPreviewTitle}
          onChange={handleTitleChange}
        />

        <HiOutlineClock className='h-[1.3rem] w-[1.3rem] justify-self-center' />

        <div className='col-start-2 col-end-2 flex gap-8'>
          <DateInput
            value={format(eventPreviewStartDay as Date, 'yyyy-MM-dd')}
            onChange={e => { setEventPreviewStartDay(new Date(e.target.value + 'T00:00:00')) }}
            name='startDate'
          />
          <DateInput
            value={format(eventPreviewEndDay as Date, 'yyyy-MM-dd')}
            onChange={e => { setEventPreviewEndDay(new Date(e.target.value + 'T00:00:00')) }}
            name='endDate'
          />
        </div>

        <HiOutlineMenuAlt2 className='h-[1.3rem] w-[1.3rem] justify-self-center' />
        <ToggleShowButton buttonText='Add a description'>
          <textarea
            className='w-full
                       rounded-sm
                       border-b-[2px]
                       border-b-transparent
                       bg-slate-100
                       p-2
                       outline-none
                       transition
                       focus:border-b-blue-500'
            name='description'
            placeholder='Add a description'
            rows={2}
          />
        </ToggleShowButton>

        <HiOutlineLocationMarker className='h-[1.3rem] w-[1.3rem] justify-self-center' />

        <ToggleShowButton buttonText='Add a location'>
          <input
            type='text'
            className='w-full
                       rounded-sm
                       border-b-[2px]
                       border-b-transparent
                       bg-slate-100
                       p-2
                       outline-none
                       transition
                       focus:border-b-blue-500'
            name='location'
            placeholder='Add a location'
          />
        </ToggleShowButton>

      </div>

      <div className='mb-2 mr-4 mt-4 flex justify-end'>
        <Button>Save</Button>
      </div>
    </form>
  )
}

export default CreateEventForm
