import { NavigationBar } from '@/components/layout/NavigationBar'
import { Sidebar } from './Sidebar/Sidebar'
import { PropsWithChildren, useCallback, useLayoutEffect } from 'react'
import tw from 'tailwind-styled-components'
import { useUIStore } from '@/stores/ui'
import { useWindowSize } from '@uidotdev/usehooks'

const Main = tw.main`
	h-auto lg:w-[calc(100vw_-_256px)]
	p-4 lg:translate-x-64 pt-24 xl:pb-8 xl:px-12
	overflow-hidden
	fixed top-0
`

export function DefaultLayout({ children }: PropsWithChildren) {
	const { width: windowWidth } = useWindowSize()
	const { setSidebarOpen, isSidebarOpen } = useUIStore(
		({ setSidebarOpen, isSidebarOpen }) => ({
			setSidebarOpen,
			isSidebarOpen,
		}),
	)

	const closeSidebarOnWindowClick = useCallback(
		(event: MouseEvent) => {
			// return, if this isn't a mobile device (because the sidebar open/close only works for mobile devices)
			if (windowWidth >= 768 || !isSidebarOpen) return

			const { x, y } = event

			// 61px is the height of the navigation bar
			// 256px is the width of the sidebar
			if (y > 61 && x > 256) {
				setSidebarOpen(false)
			}
		},
		[isSidebarOpen, setSidebarOpen, windowWidth],
	)

	useLayoutEffect(() => {
		window.addEventListener('click', closeSidebarOnWindowClick)

		return () => {
			window.removeEventListener('click', closeSidebarOnWindowClick)
		}
	}, [closeSidebarOnWindowClick])

	return (
		<div className="antialiased bg-white dark:bg-gray-900 h-screen">
			<NavigationBar />
			<Sidebar />
			<Main>{children}</Main>
		</div>
	)
}
