const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const formatDateString = dateString => dateString.replace(
    /([\dT:-]+)\+(\d{2})(\d{2})$/g,
    (match, date, hh, mm) => `${date}+${hh}:${mm}`
)

const withLeadingZero = num => {
	const asString = String(num)
	return asString.length === 1 && `0${asString}` || asString
}
export const day = d => withLeadingZero(d.getDate())
export const year = d => d.getFullYear()
export const month = (d, long = false) => {
	const m = d.getMonth()
	return long && months[m] || withLeadingZero(m + 1)
}

export const hour = d => withLeadingZero(d.getHours())
export const minute = d => withLeadingZero(d.getMinutes())

export const date = d => `${day(d)} ${month(d, true)} ${year(d)}`
export const time = d => `${hour(d)}:${minute(d)}`
export const datetime = d => `${day(d)}/${month(d)}/${year(d)} ${time(d)}`
