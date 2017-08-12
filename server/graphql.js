const gql = require('graphql-tag')
const graphql = require('graphql-anywhere').default

module.exports = resolver => (data, query) => graphql(
	resolver,
	gql(query),
	null,
	data
)
