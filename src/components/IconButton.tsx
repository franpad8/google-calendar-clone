import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconElement: IconType
}

function IconButton ({ IconElement, ...props }: Props) {
  const classes = 'cursor-pointer rounded-full hover:bg-slate-200 p-1'

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
