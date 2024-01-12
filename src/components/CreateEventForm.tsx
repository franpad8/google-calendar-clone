import Button from './Button'

function CreateEventForm () {
  return (
    <form className='flex max-h-[29rem] max-w-[30rem] flex-col gap-8 overflow-auto'>
      <input
        className='border-b-2
                 border-b-slate-100
                   text-2xl
                   outline-none
                   transition-all
                   focus:border-b-blue-600' type='text' name='title' placeholder='Add a title'
      />
      <Button className='self-end'>Save</Button>
    </form>
  )
}

export default CreateEventForm
