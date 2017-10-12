import api from 'utils/api'

export async function getContent() {
	const response = await api({
		params : {
			query : `{
				startPage {
					id
					title
					subtitle
					image
					metaTitle
					metaDescription
					metaImage
					githubLink
					twitterLink
					facebookLink
					linkedinLink
					shownPosts
					selected {
						post {
							id
						}
					}
				}
				post {
					id
					slugs
					publishedAt
					title
					tags
					metaTitle
					metaDescription
					metaImage
					preamble
					body
				}
				footer {
					id
					text
				}
			}`
		}
	})

	const { post, footer, startPage } = response.data

	return {
		posts     : post,
		footer    : footer[0],
		startPage : startPage[0]
	}
}
