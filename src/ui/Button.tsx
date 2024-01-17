import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: string
}

function Button ({ children, className, variation = 'primary', ...props }: Props) {
  const classes = twMerge(
    'select-none rounded-md bg-blue-600 px-4 py-2 text-white',
    'hover:bg-blue-700 transition text-sm font-medium',
    'disabled:bg-blue-200',
    variation === 'secondary' ? 'bg-white hover:bg-slate-100 text-surface' : '',
    className
  )

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
