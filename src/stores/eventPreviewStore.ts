import { create } from 'zustand'

interface StoreDataType {
  title: string
  startDay: Date | null
  endDay: Date | null
  setTitle: (title: string) => void
  setStartDay: (date: Date) => void
  setEndDay: (date: Date) => void
  reset: () => void
}

const useEventPreviewStore = create<StoreDataType>(set => ({
  startDay: null,
  endDay: null,
  title: '',
  setStartDay: (date: Date) => set(() => ({ startDay: date })),
  setEndDay: (date: Date) => set(() => ({ endDay: date })),
  setTitle: (title: string) => set(() => ({ title })),
  reset: () => set(() => ({
    title: '',
    startDay: null,
    endDay: null
  }))
}))

export default useEventPreviewStore
