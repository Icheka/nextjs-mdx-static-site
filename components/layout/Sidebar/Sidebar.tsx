import { SidebarCategory } from '@/components/layout/Sidebar/Category'
import { SidebarGroup } from '@/components/layout/Sidebar/Group'
import { SidebarLink } from '@/components/layout/Sidebar/Link'
import {
	isCategory,
	isGroup,
	isLink,
	links,
} from '@/components/layout/Sidebar/links'
import { useUIStore } from '@/stores/ui'
import clsx from 'clsx'

export function Sidebar() {
	const isSidebarOpen = useUIStore(({ isSidebarOpen }) => isSidebarOpen)

	return (
		<aside
			className={clsx(
				'fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-slate-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700',
				{
					'translate-x-0': isSidebarOpen,
					'-translate-x-full': !isSidebarOpen,
				},
			)}
			aria-label="Sidenav"
			id="drawer-navigation"
		>
			<div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
				<form action="#" method="GET" className="hidden mb-2">
					<label htmlFor="sidebar-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								></path>
							</svg>
						</div>
						<input
							type="text"
							name="search"
							id="sidebar-search"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
							placeholder="Search"
						/>
					</div>
				</form>
				<ul className="space-y-3">
					{links.map((obj, i) => {
						function content() {
							if (isLink(obj)) return <SidebarLink {...obj} />
							if (isGroup(obj)) return <SidebarGroup {...obj} />
							if (isCategory(obj))
								return <SidebarCategory {...(obj as any)} />
							return null
						}
						return <li key={i}>{content()}</li>
					})}
				</ul>
			</div>
		</aside>
	)
}
