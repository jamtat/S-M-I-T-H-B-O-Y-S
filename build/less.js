'use strict'

const less = require( 'less' )
const utils = require( './utils' )

const LessOptions = {
	filename: 'index.less',
	paths: 'src/less',
	compress: true
}

const compileLess = () => {
	less.render( utils.file `src/less/index.less`, LessOptions )
		.then(
			output => {
				utils.writeFile( 'static/smithboys.css', output.css )
			},
			error => console.error( error )
		)
}

module.exports = compileLess
