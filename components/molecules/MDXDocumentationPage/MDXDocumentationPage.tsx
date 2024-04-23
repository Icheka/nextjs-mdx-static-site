import { MDXHydratedPage } from '@/types/mdx'
import tw from 'tailwind-styled-components'
import { MDXRemote } from 'next-mdx-remote'
import Links from '@/components/mdx/Links'
import { QuickLink } from '@/components/mdx/QuickLink'
import {
	MouseEventHandler,
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { AlertQuote, BlockQuote, WarningQuote } from '../../mdx/BlockQuote'
import { ScoutInitialisationWarning } from '@/components/mdx/ScoutInitialisationWarning'
import { useRouter } from 'next/router'

const Container = tw.div`
	overflow-hidden
	max-h-[100vh] lg:max-h-[88vh] w-[calc(100vw_-_32px)] lg:w-[calc(100vw_-_310px)]
`

const Heading = tw.h1`
    text-4xl font-extrabold text-gray-800
`

const Description = tw.p`
    text-xl text-slate-400 mt-3
`

const Content = tw.div`
    mt-10
    prose
	max-w-3xl
	overflow-hidden
`

const Page = tw.article`
	flex justify-between
	overflow-hidden
`

const Aside = tw.aside`
	w-full max-w-[250px] hidden md:block ml-4 2xl:ml-0
`

const AsideHeader = tw.div`
	uppercase font-semibold text-sm text-gray-900
	mb-2.5
`

const AsideQuickLink = tw.a`
	text-sm text-gray-400
	inline-block w-full
`

export default function MDXDocumentationPage({
	page,
	content,
}: MDXHydratedPage) {
	const asideContainerRef = useRef<HTMLDivElement>()
	const pageContentParentRef = useRef<HTMLDivElement>()

	const router = useRouter()

	const [quickLinks, setQuickLinks] = useState<Array<QuickLink>>([])

	useLayoutEffect(() => {
		const quickLinks = extractQuickLinks()
		setQuickLinks(quickLinks)
	}, [router.asPath])

	const onQuickLinkClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
		(event) => {
			event.preventDefault()
			if (!pageContentParentRef.current) return

			const id = event.currentTarget.href.slice(
				event.currentTarget.href.indexOf('#') + 1,
			)

			const section = document.querySelector(`span[id='${id}']`)
			if (!section) return

			const { top } = section.getBoundingClientRect()

			const scrollY = top - 80
			pageContentParentRef.current.scrollTo(0, scrollY)
			// TODO: fix bug with render when page loads with hypertext in address
			// router.push(`#${id}`, undefined, { shallow: true })
		},
		[],
	)

	return (
		<Container>
			{/* breadcrumbs here */}
			<Page>
				<div
					className="!overflow-y-auto h-[100vh] lg:h-[85vh] pb-32"
					ref={pageContentParentRef}
				>
					<Heading>{page.title}</Heading>
					<Description>{page.description}</Description>
					<Content>
						<MDXRemote
							{...content}
							components={{
								InternalLink: Links.InternalLink,
								ExternalLink: Links.ExternalLink,
								QuickLink,
								BlockQuote,
								AlertQuote,
								WarningQuote,
								ScoutInitialisationWarning,
							}}
						/>
					</Content>
				</div>
				<Aside ref={asideContainerRef}>
					{!!quickLinks.length && (
						<>
							<AsideHeader>On this page</AsideHeader>
							<div className="space-y-2">
								{quickLinks.map(({ href, text }) => (
									// the href prop ensures that the link is shown on hover
									<AsideQuickLink
										onClick={onQuickLinkClick}
										href={href}
										key={href}
									>
										{text}
									</AsideQuickLink>
								))}
							</div>
						</>
					)}
				</Aside>
			</Page>
		</Container>
	)
}

interface QuickLink {
	href: string
	text: string
}

function extractQuickLinks(): Array<QuickLink> {
	const nodes = document.querySelectorAll("[data-name='quick-link']")
	const processedIDs: Array<string> = []
	return Array.from(nodes.entries())
		.map(([_, node]) => {
			const { id, textContent: text } = node

			if (processedIDs.includes(id)) return null
			processedIDs.push(id)

			return {
				href: `#${id}`,
				text,
			}
		})
		.filter(Boolean)
}
