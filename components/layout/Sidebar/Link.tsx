import tw from 'tailwind-styled-components'
import NextLink from 'next/link'
import { Link } from '@/components/layout/Sidebar/links'
import { useLayoutEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export const Label = tw.span`
    text-sm text-[rgb(85,92,105)]
    inline-block w-full
`

export function SidebarLink({
	href,
	label,
	className,
	pathMatch,
}: Link & { className?: string }) {
	const [isActive, setIsActive] = useState(false)

	const router = useRouter()

	useLayoutEffect(() => {
		const isActive = (() => {
			if (!global.window) return false
			const path = new URL(window.location.href).pathname
			return pathMatch === path
		})()

		setIsActive(isActive)
	}, [pathMatch, router.asPath])

	return (
		<NextLink className="pl-[22px]" href={href}>
			<Label
				className={clsx(className, {
					'text-primary font-bold': isActive,
				})}
			>
				{label}
			</Label>
		</NextLink>
	)
}
