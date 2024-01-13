import { create } from 'zustand'
import { addMonths, subMonths } from 'date-fns'

interface SelectedMonthType {
  selectedMonth: Date,
  incrementMonth: () => void,
  decrementMonth: () => void,
  goToCurrentMonth: () => void
}

const useSelectedMonthStore = create<SelectedMonthType>(set => ({
  selectedMonth: new Date(),
  incrementMonth: () => set(state => ({ selectedMonth: addMonths(state.selectedMonth, 1) })),
  decrementMonth: () => set(state => ({ selectedMonth: subMonths(state.selectedMonth, 1) })),
  goToCurrentMonth: () => set(() => ({ selectedMonth: new Date() }))
}))

export default useSelectedMonthStore
