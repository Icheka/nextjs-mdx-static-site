import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Actions {
	setSidebarOpen: (open: boolean) => void
}

interface State extends Actions {
	isSidebarOpen: boolean
}

export const useUIStore = create<State>()(
	immer((set) => ({
		isSidebarOpen: false,

		// actions
		setSidebarOpen(open) {
			set((s) => {
				s.isSidebarOpen = open
			})
		},
	})),
)
