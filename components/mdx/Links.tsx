import Link from 'next/link'
import { PropsWithChildren } from 'react'
import tw from 'tailwind-styled-components'

const Anchor = tw.span`
    text-primary underline
`

interface Props {
	href?: string
}

export function ExternalLink({
	href = '#',
	children,
}: PropsWithChildren<Props>) {
	return (
		<a href={href}>
			<Anchor>{children}</Anchor>
		</a>
	)
}

export function InternalLink({
	href = '#',
	children,
}: PropsWithChildren<Props>) {
	return (
		<Link href={href}>
			<Anchor>{children}</Anchor>
		</Link>
	)
}

const Links = {
	InternalLink,
	ExternalLink,
}

export default Links
