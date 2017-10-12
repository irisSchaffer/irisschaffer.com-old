import marked from 'marked'
import highlighter from 'highlight.js/lib/highlight'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import elm from 'highlight.js/lib/languages/elm'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'

highlighter.registerLanguage('bash', bash)
highlighter.registerLanguage('css', css)
highlighter.registerLanguage('dockerfile', dockerfile)
highlighter.registerLanguage('elm', elm)
highlighter.registerLanguage('javascript', javascript)
highlighter.registerLanguage('json', json)
highlighter.registerLanguage('xml', xml)

export const splitText = (str) => str.split('').map(c => c.replace(' ', '&nbsp;'))

export function	truncate(str, maxLength = 120, useWordBoundary = true) {
	const isTooLong = str.length > maxLength
	let newStr = isTooLong ? str.substr(0, maxLength - 3) : str

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
