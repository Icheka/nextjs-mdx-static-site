import { config } from '@/config'
import clsx from 'clsx'
import Link from 'next/link'
import {
	DetailedHTMLProps,
	ImgHTMLAttributes,
	ReactNode,
	forwardRef,
	useCallback,
} from 'react'

type ImageProps = DetailedHTMLProps<
	ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>

type Props = ImageProps & {
	full?: boolean
	asLink?: boolean
	imageClassName?: string
	labelClassName?: string
}

export const Logo = forwardRef<HTMLImageElement, Props>(
	(
		{
			src: _,
			full = false,
			asLink = true,
			className,
			imageClassName,
			labelClassName,
			...props
		},
		ref,
	) => {
		const wrapper = useCallback(
			(children: ReactNode) =>
				asLink ? <Link href="/">{children}</Link> : <>{children}</>,
			[asLink],
		)

		return wrapper(
			<span
				className={clsx(
					'flex items-center justify-between gap-x-px mr-4',
					className,
				)}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					ref={ref}
					{...props}
					src={full ? '/logo-full-dark.png' : '/logo.png'}
					alt={`${config.branding.businessName} logo`}
					className={clsx('w-24 md:w-28', imageClassName)}
				/>
				<span
					className={clsx(
						'text-3xl text-gray-400 font-medium',
						labelClassName,
					)}
				>
					docs
				</span>
			</span>,
		)
	},
)
Logo.displayName = 'Logo'
