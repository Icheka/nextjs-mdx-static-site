import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface MDXPage {
	title: string
	description: string
	date: string
}

export interface MDXHydratedPage {
	page: MDXPage
	sdk: string
	content: MDXRemoteSerializeResult<
		Record<string, unknown>,
		Record<string, unknown>
	>
}
