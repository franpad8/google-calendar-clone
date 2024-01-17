import { InputHTMLAttributes } from 'react'
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { twJoin } from 'tailwind-merge'

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError,
  options: RegisterOptions<T>,
  register: UseFormRegister<T>,
  name: Path<T>
}

function DateInput<T extends FieldValues> ({
  register,
  options,
  name,
  errors,
  ...props
}: Props<T>) {
  const baseClasses = 'cursor-text rounded-sm border-b border-b-transparent ' +
    'p-2 outline-none transition  focus:border-b-2 ' + 'focus:border-b-blue-600'

  return (
    <input
      type='date'
      pattern='\d{4}-\d{2}-\d{2}T00:00:00'
      {...(errors ? { title: errors.message } : {})}
      className={twJoin(
        baseClasses,
        errors
          ? 'bg-red-100 hover:bg-red-200 active:bg-red-100 focus:bg-red-100'
          : 'hover:bg-slate-100 active:bg-slate-100'
      )}
      {...register(name, { ...options })}
      {...props}
    />
  )
}

export default DateInput
