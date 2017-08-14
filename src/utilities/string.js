export const splitText = (str) => str.split('').map(c => c.replace(' ', '&nbsp;'))

export function	truncate(str, maxLength = 120, useWordBoundary = true) {
	const isTooLong = str.length > maxLength
	let newStr = isTooLong ? str.substr(0, maxLength) : str

	newStr = (useWordBoundary && isTooLong) ? newStr.substr(0, newStr.lastIndexOf(' ')) : newStr

	return isTooLong ? `${newStr}...` : newStr
}

export const stripHtml = (html) => {
	if (!process.browser) {
		return html
	}
	const tmp = document.createElement('div')

	tmp.innerHTML = html

	return tmp.textContent || tmp.innerText || ''
}
