import { Logo } from '@/components/branding'
import { useUIStore } from '@/stores/ui'
// import { Search } from '@/components/layout/Search'
import tw from 'tailwind-styled-components'

const Container = tw.nav`
	bg-[rgb(247_250_252)] dark:bg-gray-800
    border-b border-gray-200 dark:border-gray-700
	px-0 py-2.5 md:px-4
    fixed left-0 right-0 top-0 z-50
`

export function NavigationBar() {
	const { setSidebarOpen, isSidebarOpen } = useUIStore(
		({ setSidebarOpen, isSidebarOpen }) => ({
			setSidebarOpen,
			isSidebarOpen,
		}),
	)

	return (
		<Container>
			<div className="flex flex-wrap justify-between items-center">
				<div className="flex justify-start items-center">
					<button
						data-drawer-target="drawer-navigation"
						data-drawer-toggle="drawer-navigation"
						aria-controls="drawer-navigation"
						className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => setSidebarOpen(!isSidebarOpen)}
					>
						<svg
							aria-hidden="true"
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
						<svg
							aria-hidden="true"
							className="hidden w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
						<span className="sr-only">Toggle sidebar</span>
					</button>

					<Logo full asLink className="hidden md:flex" />
					<Logo
						full={false}
						asLink
						className="flex md:hidden"
						imageClassName="!w-7"
						labelClassName="text-lg ml-1"
					/>
					{/* <Search /> */}
				</div>
				<div className="flex items-center lg:order-2 hidden">
					<button
						type="button"
						data-drawer-toggle="drawer-navigation"
						aria-controls="drawer-navigation"
						className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
					>
						<span className="sr-only">Toggle search</span>
						<svg
							aria-hidden="true"
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								clipRule="evenodd"
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</Container>
	)
}
