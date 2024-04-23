import { Group, Link, isGroup, isLink } from '@/components/layout/Sidebar/links'
import tw from 'tailwind-styled-components'
import { FiChevronRight } from 'react-icons/fi'
import { Label, SidebarLink } from '@/components/layout/Sidebar/Link'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

const Container = tw.div`
    
`

const Head = tw.button`
    flex items-center
    w-full
`

const Body = tw.div`
    space-y-3
    pt-1 pl-3
    transition duration-1000
`

export function SidebarGroup({ label, links }: Group) {
	const [isOpen, setIsOpen] = useState(false)
	const [isActive, setIsActive] = useState(false)

	const router = useRouter()

	useLayoutEffect(() => {
		const isActive = (() => {
			if (!global.window) return false

			const path = new URL(window.location.href).pathname

			function toLink(obj: Link | Group) {
				if (isLink(obj)) return obj
				if (isGroup(obj)) return obj.links.map((ch) => toLink(ch))
				return null
			}

			return (
				(
					links
						.map((link) => toLink(link))
						.flat(Infinity)
						.filter((link) => Boolean(link)) as Array<Link>
				)
					// triple-slash ensures we never accidentally match links without pathMatches
					.map(({ pathMatch }) => pathMatch ?? '///')
					.includes(path)
			)
		})()

		setIsActive(isActive)
	}, [links, router.asPath])

	useEffect(() => {
		setIsOpen(isActive)
	}, [isActive])

	return (
		<Container>
			<Head onClick={() => setIsOpen((s) => !s)}>
				<FiChevronRight
					className={clsx({
						'transform rotate-90': isOpen,
						'text-primary': isActive,
						'text-black': !isActive,
					})}
				/>
				<Label
					className={clsx('pl-2 text-left', {
						'text-primary font-bold': isActive,
					})}
				>
					{label}
				</Label>
			</Head>

			<Body
				className={clsx({
					'h-0 overflow-hidden -mb-1.5': !isOpen,
				})}
			>
				{links.map((link, i) => {
					if (isLink(link))
						return (
							<SidebarLink
								key={i}
								{...link}
								className="font-normal"
							/>
						)
					if (isGroup(link)) return <SidebarGroup key={i} {...link} />
					return null
				})}
			</Body>
		</Container>
	)
}
