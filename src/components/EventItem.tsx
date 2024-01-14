interface PropsType {
  event: {
    title: string
  }
}

function EventItem ({ event }: PropsType) {
  return (
    <li className='hover:
                   w-[95%]
                   cursor-pointer
                   truncate
                   text-wrap
                   rounded-[4px]
                 bg-sky-500
                   px-2
                   py-1
                   text-xs
                   leading-3
                 text-white
                 transition
                 hover:bg-sky-600
                 hover:text-slate-100'
    >{event.title}
    </li>
  )
}

export default EventItem
