import { SidebarGroup } from '@/components/layout/Sidebar/Group'
import { SidebarLink } from '@/components/layout/Sidebar/Link'
import { Category, isGroup, isLink } from '@/components/layout/Sidebar/links'
import tw from 'tailwind-styled-components'

const Container = tw.div`
    border-t border-slate-200
    pt-3 ml-1
`

const Label = tw.div`
    text-[rgb(65_69_82)] text-sm font-semibold uppercase
`

const Body = tw.ul`
    space-y-3
    pt-1.5
`

export function SidebarCategory({ links, label }: Category) {
	return (
		<Container>
			<Label>{label}</Label>
			<Body>
				{links.map((obj, i) => {
					function content() {
						if (isLink(obj)) return <SidebarLink {...obj} />
						if (isGroup(obj)) return <SidebarGroup {...obj} />
						return null
					}
					return <li key={i}>{content()}</li>
				})}
			</Body>
		</Container>
	)
}
