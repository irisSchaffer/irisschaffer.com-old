const customProperties = {
	fontPrimary   : '"Lato", sans-serif',
	fontSecondary : '"Lato", sans-serif',
	white         : '#FFF',
	lightGray     : '#FAFAFA',
	darkGray      : '#3D3D3D',
	swatchPrimary : '#EF4F47',
	swatchBody    : 'var(--white)',
	swatchFont    : 'var(--darkGray)',
	widthMobile   : 767,
	widthTablet   : 991,
	widthDesktop  : 1199
}

const customMedia = {
	'--mobile'      : `only screen and (max-width : ${customProperties.widthMobile}px)`,
	'--tablet'      : `only screen and (min-width : ${customProperties.widthMobile + 1}px) and (max-width : ${customProperties.widthTablet}px)`,
	'--tabletUp'    : `only screen and (min-width : ${customProperties.widthMobile + 1}px)`,
	'--tabletDown'  : `only screen and (max-width : ${customProperties.widthTablet}px)`,
	'--desktop'     : `only screen and (min-width : ${customProperties.widthTablet + 1}px) and (max-width : ${customProperties.widthDesktop}px)`,
	'--desktopUp'   : `only screen and (min-width : ${customProperties.widthTablet + 1}px)`,
	'--desktopDown' : `only screen and (max-width : ${customProperties.widthDesktop}px)`,
	'--desktopBig'  : `only screen and (min-width : ${customProperties.widthDesktop + 1}px)`
}

module.exports = {
	customProperties,
	customMedia
}
