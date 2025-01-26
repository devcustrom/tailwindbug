export const debounce = (fn, wait) => {
	let timer
	return (event) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			if (typeof fn === 'function') {
				fn(event)
			}
		}, wait)
	}
}
