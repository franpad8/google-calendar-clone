import { ReactNode, useState } from 'react'

interface PropsType {
  children: ReactNode,
  buttonText: string
}

function ToggleShowButton ({ children, buttonText }: PropsType) {
  const [show, setShow] = useState<boolean>(false)

  if (show) return children

  return (
    <button
      className='cursor-pointer
                rounded-md
                p-2
                text-left
                text-slate-500
                outline-none
                transition
                hover:bg-slate-100'
      type='button'
      onClick={() => setShow(true)}
    >{buttonText}
    </button>
  )
}

export default ToggleShowButton
