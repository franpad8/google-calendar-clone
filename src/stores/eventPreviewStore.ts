import { create } from 'zustand'

interface StoreDataType {
  title: string,
  day: Date | null,
  setTitle: (title: string) => void,
  setDay: (date: Date) => void
  reset: () => void
}

const useEventPreviewStore = create<StoreDataType>(set => ({
  day: null,
  title: '',
  setDay: (date: Date) => set(() => ({ day: date })),
  setTitle: (title: string) => set(() => ({ title })),
  reset: () => set(() => ({
    title: '',
    day: null
  }))
}))

export default useEventPreviewStore
