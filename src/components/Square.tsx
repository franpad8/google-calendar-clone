import React from 'react'

interface SquareProps {
  dayName?: string
  dayNumber: string
  isToday?: boolean
}

function Square ({
  dayName,
  dayNumber,
  isToday = false
}: SquareProps): React.ReactElement {
  const style = isToday ? 'bg-blue-600 text-white' : ''

  return (
    <div
      className='flex flex-col
                 items-center
                 gap-1
                 border-b
                 border-r
                 border-solid
                 border-b-hairline
                 border-r-hairline
                 bg-white
                 py-2'
    >
      {dayName && (
        <span className='text-[11px] font-semibold uppercase text-slate-500'>
          {dayName}
        </span>
      )}
      <span className={`h-6 min-w-6 rounded-full text-center text-xs font-medium leading-6 ${style}`}>
        {dayNumber}
      </span>
    </div>
  )
}

export default Square
