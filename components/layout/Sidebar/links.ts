import { getPagePaths } from '@/utils/mdx/getPage'
import { ReactNode } from 'react'

type TypeStr = 'link' | 'group' | 'category'

interface Base {
	type: TypeStr
}

export interface Link extends Base {
	label: ReactNode
	href: string
	pathMatch?: string
}

export interface Group extends Base {
	label: ReactNode
	links: Array<Link | Group>
}

export interface Category extends Base {
	label: ReactNode
	links: Array<Group | Link>
}

type Type = Link | Group | Category

export const links: Array<Type> = [
	{
		type: 'link',
		label: 'Overview',
		href: '#',
	},
	{
		type: 'group',
		label: 'Quick Start',
		links: [
			{
				type: 'group',
				label: 'Backend',
				links: [
					{
						label: 'Go',
						href: 'go',
						type: 'link',
					},
				].map((obj) => ({
					...obj,
					href: `/quick-start/backend/${obj.href}`,
					pathMatch: `/quick-start/backend/${obj.href}`,
				})) as Array<Link>,
			},
		],
	},
	{
		type: 'link',
		label: 'What Can Scout Do?',
		href: '#',
	},
	{
		type: 'category',
		label: 'SDKs',
		links: [
			{
				type: 'group',
				label: 'JavaScript SDK (client-side)',
				links: [],
			},
			{
				type: 'group',
				label: 'Node SDK',
				links: [],
			},
			{
				type: 'group',
				label: 'Go SDK',
				links: [
					{
						type: 'link',
						label: 'Overview',
						href: 'overview',
					},
					{
						type: 'link',
						label: 'Logging',
						href: 'logging',
					},
					{
						type: 'link',
						label: 'Error Monitoring',
						href: 'error-monitoring',
					},
					{
						type: 'link',
						label: 'Metrics',
						href: 'metrics',
					},
					{
						type: 'group',
						label: 'Configuration',
						links: [
							{
								type: 'link',
								label: 'Environments',
								href: 'environments',
							},
							{
								type: 'link',
								label: 'Versioning & Releases',
								href: 'versioning',
							},
							{
								type: 'link',
								label: 'Sampling',
								href: 'sampling',
							},
						].map((obj) =>
							isLink(obj as any)
								? {
										...obj,
										href: `/sdks/go/configuration/${obj.href}`,
										pathMatch: `/sdks/go/configuration/${obj.href}`,
								  }
								: obj,
						),
					},
					{
						type: 'group',
						label: 'Frameworks',
						links: [
							{
								type: 'link',
								label: 'Chi',
								href: 'chi',
							},
							{
								type: 'link',
								label: 'Echo',
								href: 'echo',
							},
							{
								type: 'link',
								label: 'Fiber',
								href: 'fiber',
							},
							{
								type: 'link',
								label: 'Gin',
								href: 'gin',
							},
							{
								type: 'link',
								label: 'Gorilla Mux',
								href: 'gorilla-mux',
							},
							{
								type: 'link',
								label: '99designs/gqlgen',
								href: 'gqlgen',
							},
						].map((obj) =>
							isLink(obj as any)
								? {
										...obj,
										href: `/sdks/go/frameworks/${obj.href}`,
										pathMatch: `/sdks/go/frameworks/${obj.href}`,
								  }
								: obj,
						),
					},
				].map((obj) =>
					isLink(obj as any)
						? {
								...obj,
								href: `/sdks/go/${obj.href}`,
								pathMatch: `/sdks/go/${obj.href}`,
						  }
						: obj,
				) as Array<Link | Group>,
			},
			{
				type: 'group',
				label: 'Python SDK',
				links: [],
			},
			{
				type: 'group',
				label: 'Ruby SDK',
				links: [],
			},
			{
				type: 'group',
				label: 'PHP SDK',
				links: [],
			},
			{
				type: 'group',
				label: 'Java SDK',
				links: [],
			},
			{
				type: 'group',
				label: 'Nest SDK',
				links: [],
			},
		],
	},
	{
		type: 'category',
		label: 'Session Replay',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
	{
		type: 'category',
		label: 'Error Monitoring',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
	{
		type: 'category',
		label: 'Logging Instrumentation',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
	{
		type: 'category',
		label: 'Integrations',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
	{
		type: 'category',
		label: 'Sourcemaps',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
	{
		type: 'category',
		label: 'Open Telemetry',
		links: [
			{
				type: 'link',
				label: 'Overview',
				href: '#',
			},
		],
	},
]

export function isLink(obj: Type): obj is Link {
	return obj.type === 'link'
}

export function isGroup(obj: Type): obj is Group {
	return obj.type === 'group'
}

export function isCategory(obj: Type): obj is Category {
	return obj.type === 'category'
}
