
export function getScrollTop() {
	return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getWindowHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}