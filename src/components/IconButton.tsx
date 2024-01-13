import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconElement: IconType
}

function IconButton ({ IconElement, ...props }: Props) {
  const classes = 'cursor-pointer rounded-full hover:bg-slate-50 p-[.4rem] focus:bg-slate-200 active:bg-slate-300 transition'

  return (
    <button
      className={classes}
      {...props}
    >
      <IconElement className='h-[1.2rem] w-[1.2rem]' />
    </button>
  )
}

export default IconButton
