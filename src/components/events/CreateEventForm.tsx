import { SubmitHandler, useForm } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'
import { format } from 'date-fns'
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineMenuAlt2 } from 'react-icons/hi'

import useEventPreviewStore from '../../stores/eventPreviewStore'
import Button from '../../ui/Button'
import useModal from '../../hooks/useModal'
import DateInput from '../../ui/DateInput'
import ToggleShowButton from '../../ui/ToggleShowButton'
import { EventType } from '../../types/event'
import useEventStore from '../../stores/eventStore'
interface Props {
  modalMode: boolean
}

type FormFields = {
  title: string,
  startDay: string,
  endDay: string,
  description: string,
  location: string
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

  const addEvent = useEventStore(state => state.addEvent)

  const { close: closeModal } = useModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: {
      title: eventPreviewTitle
    }
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newEvent: EventType = {
      id: crypto.randomUUID(),
      title: data.title || '(Untitled)',
      startDate: data.startDay,
      endDate: data.endDay,
      location: data.location,
      description: data.description
    }
    addEvent(newEvent)
    if (modalMode) { closeModal() }
    resetEventPreview()
  }

  return (
    <form className='overflow-auto' onSubmit={handleSubmit(onSubmit)}>
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
          placeholder='Add a title and a time'
          {...register('title', {
            onChange: (e) => setEventPreviewTitle(e.target.value)
          })}
        />

        <HiOutlineClock className='h-[1.3rem] w-[1.3rem] justify-self-center' />

        <div className='col-start-2 col-end-2 flex gap-8'>
          <DateInput<FormFields>
            defaultValue={format(eventPreviewStartDay as Date || new Date(), 'yyyy-MM-dd')}
            errors={errors.startDay}
            name='startDay'
            register={register}
            options={{
              onChange: (event) => setEventPreviewStartDay(new Date(event.target.value + 'T00:00:00')),
              required: true,
              validate: (startDay, formValues) => startDay <= formValues.endDay ||
                'Event cannot finish without having started'
            }}
          />
          <DateInput<FormFields>
            defaultValue={format(eventPreviewEndDay as Date || new Date(), 'yyyy-MM-dd')}
            {...(errors.endDay ? { title: errors.endDay.message } : {})}
            errors={errors.endDay}
            name='endDay'
            register={register}
            options={{
              onChange: (event) => setEventPreviewEndDay(new Date(event.target.value + 'T00:00:00')),
              required: true,
              validate: (endDay, formValues) => endDay >= formValues.startDay ||
                'Event cannot finish without having started'
            }}
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
            placeholder='Add a description'
            rows={2}
            {...register('description')}
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
            placeholder='Add a location'
            {...register('location')}

          />
        </ToggleShowButton>

      </div>

      <div className='mb-2 mr-4 mt-4 flex justify-end'>
        <Button disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Save'}</Button>
      </div>
    </form>
  )
}

export default CreateEventForm
