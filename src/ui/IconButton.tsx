import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconElement: IconType,
  size?: string
}

function IconButton ({ IconElement, size = 'sm', ...props }: Props) {
  const iconClasses = twMerge(
    'h-[1.2rem] w-[1.2rem]',
    size === 'md' ? 'h-[1.4rem] w-[1.4rem]' : ''
  )
  const buttonClasses = twMerge(
    'cursor-pointer rounded-full hover:bg-slate-50 p-[.4rem] ' +
      'focus:bg-slate-200 active:bg-slate-300 transition',
    size === 'md' ? 'p-[.8rem]' : ''
  )

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      <IconElement className={iconClasses} />
    </button>
  )
}

export default IconButton
