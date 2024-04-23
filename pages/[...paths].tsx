import { GetStaticPropsContext } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXHydratedPage } from '@/types/mdx'
import { MDXDocumentationPage } from '@/components/molecules'
import { getPage, getPagePaths } from '@/utils/mdx/getPage'
import { sep as pathSeparator } from 'path'
import rehypeHighlight from 'rehype-highlight'

// For scaffolding a doc site with MDX, see:
// 		- https://www.thisdot.co/blog/how-to-build-a-blog-with-next-js-tailwind-css-and-mdx
//	    - https://www.codemotion.com/magazine/frontend/how-to-create-an-mdx-blog-in-typescript-with-next-js/
//
// For syntax highlighting for code blocks with MDX, see:
// 		- https://gaudion.dev/blog/mdx-syntax-highlighting

export default function GettingStartedCategoryOverviewPage(
	page: MDXHydratedPage,
) {
	return <MDXDocumentationPage {...page} />
}

export async function getStaticPaths() {
	const pages = getPagePaths()
	const paths = pages.map((path) => ({
		params: {
			paths: path.split(pathSeparator),
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({
	params: { paths },
}: GetStaticPropsContext<{
	paths: Array<string>
}>) {
	const { page, content } = getPage(paths)
	const mdx = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeHighlight] as any,
		},
	})

	return {
		props: { page, content: mdx, path: '' },
	}
}
