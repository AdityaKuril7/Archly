import {create} from "zustand"

interface UiStore {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const useUiStore = create<UiStore>((set)=>({
  isSidebarOpen:false,
  toggleSidebar: () => set((state)=> ({isSidebarOpen: !state.isSidebarOpen})),
}))

export default useUiStore