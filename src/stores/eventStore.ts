import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type EventType } from '../types/event'

interface DataType {
  events: EventType[],
  setEvents: (events: EventType[]) => void,
  addEvent: (event: EventType) => void
  deleteEvent: (eventId: string) => void
}

const useEventStore = create<DataType>()(
  persist<DataType>(
    (set, get) => ({
      events: [],
      setEvents: (events:EventType[]) => set({ events }),
      addEvent: (event: EventType) => set({ events: [...get().events, event] }),
      deleteEvent: (eventId: string) => set({
        events: get().events.filter(event => event.id !== eventId)
      })
    }),
    {
      name: 'events-storage'
    }
  )
)

export default useEventStore
