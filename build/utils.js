const path = require( 'path' )
const fs = require( 'fs' )
const resolve = a => path.resolve( a.raw ? a[ 0 ] : a )
const file = f => fs.readFileSync( resolve( f ), 'utf8' )
const writeFile = ( f, s ) => fs.writeFileSync( path.resolve( f ), s, 'utf8' )


module.exports = {
	resolve,
	file,
	writeFile
}
