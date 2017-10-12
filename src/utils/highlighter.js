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

export default highlighter
