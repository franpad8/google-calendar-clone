import { create } from 'zustand'

interface StoreDataType {
  showSidebar: boolean
  toggleSidebar: () => void
}

const useToggleSidebarStore = create<StoreDataType>(set => ({
  showSidebar: true,
  toggleSidebar: () => set(state => ({ showSidebar: !state.showSidebar }))
}))

export default useToggleSidebarStore
