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
      className='flex
                 flex-col
                 gap
                 bg-white
                 items-center
                 py-2
                 border-solid
                 border-r
                 border-r-hairline
                 border-b
                 border-b-hairline'
    >
      {dayName && (
        <span className='uppercase font-semibold text-slate-400'>
          {dayName}
        </span>
      )}
      <span className={`py-2 px-4 rounded-[50%] ${style}`}>{dayNumber}</span>
    </div>
  )
}

export default Square
