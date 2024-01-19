import { create } from 'zustand'
import { addMonths, subMonths, startOfMonth } from 'date-fns'

interface SelectedMonthType {
  selectedMonth: Date,
  setSelectedMonth: (month: Date) => void,
  incrementMonth: () => void,
  decrementMonth: () => void,
  goToCurrentMonth: () => void
}

const useSelectedMonthStore = create<SelectedMonthType>(set => ({
  selectedMonth: new Date(),
  setSelectedMonth: (month: Date) => set(() => ({ selectedMonth: startOfMonth(month) })),
  incrementMonth: () => set(state => ({ selectedMonth: addMonths(state.selectedMonth, 1) })),
  decrementMonth: () => set(state => ({ selectedMonth: subMonths(state.selectedMonth, 1) })),
  goToCurrentMonth: () => set(() => ({ selectedMonth: new Date() }))
}))

export default useSelectedMonthStore
