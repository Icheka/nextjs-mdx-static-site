import { PropsWithChildren } from 'react'
import tw from 'tailwind-styled-components'

const Base = tw.div`
    border-l-[3px]
    p-3
    [&>p]:m-0
    italic text-sm
`

export function BlockQuote({ children }: PropsWithChildren) {
	return (
		<Base className="border-primary bg-primary/10 text-primary">
			{children}
		</Base>
	)
}

export function AlertQuote({ children }: PropsWithChildren) {
	return (
		<Base className="border-red-600 bg-red-500/10 text-red-700">
			{children}
		</Base>
	)
}

export function WarningQuote({ children }: PropsWithChildren) {
	return (
		<Base className="border-amber-500 bg-amber-500/10 text-amber-600">
			{children}
		</Base>
	)
}
