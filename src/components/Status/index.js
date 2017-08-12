import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const Status = ({ code }) => (
	<Route
		render={({ staticContext }) => {
			if (staticContext) {
				staticContext.status = code
			}

			return null
		}}
	/>
)

Status.propTypes = {
	code : PropTypes.number.isRequired
}

Status.defaultProps = {
	code : 200
}

export default Status
