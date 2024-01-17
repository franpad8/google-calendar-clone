import { HiX } from 'react-icons/hi'
import useModal from '../../hooks/useModal'
import useEventPreviewStore from '../../stores/eventPreviewStore'
import Modal from '../../ui/Modal'
import CreateEventForm from './CreateEventForm'
import IconButton from '../../ui/IconButton'

function CreateEventModal () {
  const { close: closeModal } = useModal()
  const { reset } = useEventPreviewStore()

  const handleCloseModal = () => {
    reset()
    closeModal()
  }

  return (

    <Modal.Window windowId='eventCreation' onClickOutside={handleCloseModal} draggable>
      <>
        <div className='handle flex w-[32rem] cursor-move items-center justify-end bg-slate-100 px-3'>
          <Modal.Close onClose={handleCloseModal}><IconButton IconElement={HiX} /></Modal.Close>
        </div>

        <CreateEventForm modalMode />
      </>
    </Modal.Window>
  )
}

export default CreateEventModal
