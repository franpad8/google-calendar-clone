import { create } from 'zustand'
import { EventType } from '../types/event'

interface DataType {
  selectedEvent: EventType | null
  setSelectedEvent: (event: EventType) => void
}

const useSelectedEventStore = create<DataType>(set => ({
  selectedEvent: null,
  setSelectedEvent: (event: EventType) => set({ selectedEvent: event })
}))

export default useSelectedEventStore
