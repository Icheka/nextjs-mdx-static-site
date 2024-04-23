import matter from 'gray-matter'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join as joinPaths, sep as pathSeparator } from 'path'

const dirTree = ['mdx']

function getMDXFilesInDir(dirPath: string) {
	return readdirSync(dirPath)
		.map((f) => {
			const filePath = joinPaths(dirPath, f)
			if (statSync(filePath).isDirectory())
				return getMDXFilesInDir(filePath).flat()
			return filePath.endsWith('.mdx')
				? filePath
						.split(pathSeparator)
						.slice(1)
						.join(pathSeparator)
						.replace(/\.(mdx)$/, '')
				: null
		})
		.filter(Boolean)
}

export function getPagePaths(...dirs: Array<string>): Array<string> {
	return getMDXFilesInDir(joinPaths(...dirTree, ...dirs)).flat(Infinity)
}

export function getPage(paths: Array<string>) {
	const file = paths[paths.length - 1]
	const dirs = paths.slice(0, paths.length - 1)
	const contents = readFileSync(joinPaths(...dirTree, ...dirs, `${file}.mdx`))
	const { data: page, content } = matter(contents)

	return { page, content }
}
