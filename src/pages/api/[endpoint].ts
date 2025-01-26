import type { APIRoute } from 'astro'
export const prerender = false

export const GET: APIRoute = ({ params }) => {
	const {
		endpoint
	} = params

	return new Response(
		JSON.stringify({
			endpoint
		})
	)
}
