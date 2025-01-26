import qs from "qs"

import { atom } from "nanostores"

export const loaderList = atom(['start'])

export const addLoader = (loader) => {
	loaderList.set([...loaderList.get(), loader])
}

export const removeLoader = (loader) => {
	loaderList.set(loaderList.get().filter(i => i !== loader))
}

export function getUrlSite(url) {
	return url !== undefined ? (import.meta.env.APP_URL || 'http://localhost:3000') + url : ''
}

export function prettyPrice(string) {
	return string && !isNaN(string) ? string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ''
}

export function getUrlApi(url) {
	return url !== undefined ? import.meta.env.PUBLIC_API_SERVER + url : ''
}

export function getUrlInternalApi(url) {
	const env = localStorage.getItem('env')
	if(env) {
		return url !== undefined ? (env === 'dev' ? 'https://internal.dev.seller-capital.ru' : 'https://internal.seller-capital.ru')  + url : ''
	} else {
		return url !== undefined ? import.meta.env.PUBLIC_BITRIX_API + url : ''
	}
}

export function getUrlSellerApi(url) {
	const env = localStorage.getItem('env')
	if(env) {
		return url !== undefined ? (env === 'dev' ? 'https://api.dev.seller-capital.ru' : 'https://api.seller-capital.ru')  + url : ''
	} else {
		return url !== undefined ? import.meta.env.PUBLIC_SELLER_API + url : ''
	}
}

export function getMedia(obj) {
	obj = upData(obj?.data)
	return getUrlApi(obj?.url)
}

export function upData(obj) {
	return obj ? { id: obj.id, ...obj.attributes } : {}
}

export function upDataList(arr) {
	return arr?.length ? arr.map(i => upData(i)) : []
}

export async function sendToStrapi(url, options = {}) {
	return await api.strapi_post(url, options)
}

export async function daData(query) {
	try {
		return await api.seller_get('/DaData/SearchAddress?' + qs.stringify({ query }))
	} catch (e) {
		console.error(e);
	}
}

export const addBitrixScript = (u) => {
	const s = document.createElement('script')
	s.async = true
	s.src = u + '?' +(Date.now()/60000|0)
	const h = document.getElementsByTagName('script')[0]
	h.parentNode.insertBefore(s,h)
}

export async function getApi(url, options = {}, v5 = false) {
	let query = qs.stringify(options)
	let response

	try {
		response = await api.strapi_get(url + (query ? `?${query}` : ''), {
			...v5 ? {} : {
				headers: {
				'Strapi-Response-Format': 'v4'
				}
			}
		})
	} catch (e) {
		console.error(e)
		response = e
		throw Error(e)
	}

	return response
}

export const params = new Proxy(new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''), {
	get: (searchParams, prop) => searchParams.get(prop),
});

export const go = (path, options) => {
	if(window.location.pathname !== path) {
		window.location = path + (options?.clearParams ? '' : window.location.search)
	}
}

const arrayErrors = (e) => Array.isArray(e) ? e.map(i => i.errorMessage || i.message).join(',<br>') : e

export const api = new Proxy({}, {
	get(_, apiNameAndMethod) {
		return async (url, options = {}) => {
			if(options.loader) {
				addLoader(options.loader)
			}
			const errorList = [400, 401, 403, 404, 500]
			let response

			const getResponse = async () => {
				let r
				try {
					r = await (
						response
					).json()
				} catch {
					r = ''
				}

				return r
			}

			try {
				const [
					apiName,
					method,
					type
				] = apiNameAndMethod.split('_')

				const apiDomains = {
					local: getUrlSite,
					strapi: getUrlApi,
					internal: getUrlInternalApi,
					seller: getUrlSellerApi,
				}
				const domain = apiDomains[apiName]
				const responseMethod = method.toUpperCase()
				const hasBody = responseMethod !== 'GET' && responseMethod !== 'HEAD'

				const body = hasBody && options.body
					?
					typeof options.body === 'object'
					&&
					type !== 'fd'
					&&
					Object.keys(options.body).length
					?
					JSON.stringify(options.body)
					:
					options.body : ''
				const headers = {
					...type !== 'fd' ? {
						'Content-Type': 'application/json',
					} : {},
					//...(apiName !== 'strapi' && id.get() && { 'Authorization': `Bearer ${id.get()}` }),
					...(options.headers || {})
				}

				const fetchOptions = {
					method: responseMethod,
					headers,
					...(body ? { body } : {}),
				}

				// if(apiName !== 'strapi' && isDemo.get()) {
				// 	response = await demoServer(url, options)
				// 	if(errorList.includes(response.status)) {
				// 		throw Error(`Response code - ${response.status} from ${url}`, { cause: response.status !== 500 ? (response.json || 'Неизвестная ошибка') : 'Что-то пошло не так' })
				// 	}
				// 	return response.json
				// } else {
					response = await fetch(domain(url), fetchOptions);

					if(errorList.includes(response.status)) {
						throw Error(`Response code - ${response.status} from ${url}`, { cause: response.status !== 500 ? (await getResponse() || 'Неизвестная ошибка') : 'Что-то пошло не так' })
					}
					return await getResponse()
				// }

			} catch (e) {
				const error = arrayErrors(e.cause?.message || e.cause?.detail || e.cause?.errors || e.cause?.data || e.cause) || await getResponse()

				console.error(error || e)
				throw Error(e.cause !== undefined ? error : e, { cause: error })
			} finally {
				if(options.loader) {
					removeLoader(options.loader)
				}
			}
		}
	}
})

export function delay(ms) {
	return new Promise((resolve) =>
	  setTimeout(() => {
		resolve()
	  }, ms)
	)
}

export function phoneMask (inputValue) {
	if (!inputValue) return ''
	const numsStr = inputValue.replace(/\D/g, '').toString().split('')

	if (numsStr[0] === '7' || numsStr[0] === '8') {
		numsStr[0] = '7'
	} else {
		numsStr.unshift('7')
	}

	const x = numsStr
		.join('')
		.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)

	return numsStr.length ? `+${x[1]}${x[2] && '(' + x[2]}${x[3] && ')-' + x[3]}${x[4] && '-' + x[4]}${x[5] && '-' + x[5]}` : ''
}

export const copyText = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('Failed to copy text:', error);
		return false;
	}
};

export function getCustomDate(day) {
	const today = new Date();
	return new Date(today.getFullYear(), today.getMonth(), day ? today.getDate() + day : today.getDate());
}

export const formatDate = (date) => date ? date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }) : ''

export const formatCalendar = (obj) => {
	return {
		start: formatDate(obj.start),
		end: formatDate(obj.end)
	};
}

export const findIframes = (html) => {
	let result = html
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const newEls = doc.body.querySelectorAll('*')
	newEls.forEach(el => {
		if(el.tagName === "A") {
			const str = 'iframe:'
			if(el.href.slice(0, str.length) === str) {
				const iframe = (link) => {
					return `<iframe
						width="100%"
						class="aspect-video"
						src="${link.replace(str, '')}"
						frameBorder="0"
						allow="clipboard-write; autoplay"
						webkitAllowFullScreen
						mozallowfullscreen
						allowFullScreen
					></iframe>`
				}

				result = html.replace(el.outerHTML, iframe(el.href))
			}
		}
	})

	return result
}
