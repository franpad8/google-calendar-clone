import { InputHTMLAttributes } from 'react'

function DateInput ({ name, value, onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type='date'
      className='cursor-text
                     rounded-sm
                     border-b
                     border-b-transparent
                     p-2
                     outline-none
                     transition
                     hover:bg-slate-100
                     focus:border-b-2
                     focus:border-b-blue-600
                     active:bg-slate-100'
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

export default DateInput
