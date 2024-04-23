/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/get-started/:category',
				destination: '/get-started/:category/overview',
				permanent: true,
			},
		]
	},
}

export default nextConfig
