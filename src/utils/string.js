import marked from 'marked'
import highlighter from 'highlight.js'

export const splitText = (str) => str.split('').map(c => c.replace(' ', '&nbsp;'))

export function	truncate(str, maxLength = 120, useWordBoundary = true) {
	const isTooLong = str.length > maxLength
	let newStr = isTooLong ? str.substr(0, maxLength) : str

	newStr = (useWordBoundary && isTooLong) ? newStr.substr(0, newStr.lastIndexOf(' ')) : newStr

	return isTooLong ? `${newStr}...` : newStr
}

export const markdown = (markdownString) => {
	const highlight = (code, language) => {
		if (language) {
			try {
				return highlighter.highlight(language, code).value
			} catch (error) {
				// language not found
			}
		}

		return highlighter.highlightAuto(code).value
	}

	return marked(markdownString, { highlight })
}
