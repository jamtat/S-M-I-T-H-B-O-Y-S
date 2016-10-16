'use strict'

const fs = require( 'fs' )
const browserify = require( 'browserify' )
const utils = require( './utils' )


const compileJS = () => browserify( utils.resolve `src/js/index.js` )
	.transform( 'babelify', {
		presets: [ 'es2015' ]
	} )
	.bundle()
	.pipe( fs.createWriteStream( utils.resolve `static/smithboys.js` ) )

module.exports = compileJS
