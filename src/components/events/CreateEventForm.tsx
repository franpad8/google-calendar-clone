import { useShallow } from 'zustand/react/shallow'
import useEventPreviewStore from '../../stores/eventPreviewStore'
import Button from '../../ui/Button'
import { ChangeEvent, FormEvent } from 'react'
import useModal from '../../hooks/useModal'

interface Props {
  modalMode: boolean
}

function CreateEventForm ({ modalMode }: Props) {
  const {
    eventPreviewDay,
    eventPreviewTitle,
    setEventPreviewTitle,
    resetEventPreview
  } = useEventPreviewStore(useShallow(state => ({
    eventPreviewDay: state.day,
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
    <form className='flex flex-col gap-8 overflow-auto' onSubmit={handleSubmit}>
      <input
        className='border-b-2
                 border-b-slate-100
                   text-2xl
                   outline-none
                   transition-all
                   focus:border-b-blue-600'
        type='text'
        name='title'
        placeholder='Add a title'
        value={eventPreviewTitle}
        onChange={handleTitleChange}
      />
      {eventPreviewDay?.toLocaleDateString()}
      <Button className='self-end'>Save</Button>
    </form>
  )
}

export default CreateEventForm
