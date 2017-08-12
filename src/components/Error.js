import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Status from 'components/Status'

const ErrorMessage = ({ message, status }) => (
	<div>
		<Status code={status} />
		<Helmet title={message} />
		<h1 style={{ color : 'red' }}>{message}</h1>
	</div>
)

ErrorMessage.propTypes = {
	message : PropTypes.string.isRequired,
	status  : PropTypes.number
}

ErrorMessage.defaultProps = {
	status : 400
}

export default ErrorMessage
