import { createContext, useContext } from 'react'

export interface SelectedMonthContextType {
  selectedMonth: Date,
  incrementMonth: () => void,
  decrementMonth: () => void,
  goToCurrentMonth: () => void
}

export const SelectedMonthContext = createContext<SelectedMonthContextType | null>(null)

export function useSelectedMonth () {
  const context = useContext(SelectedMonthContext)

  if (!context) throw new Error('SelectedMonthContext was used outside of SelectedMonthContext')

  return context
}
