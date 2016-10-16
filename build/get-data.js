'use strict'


const fs = require( 'fs' )
const request = require( 'request' )
const getFile = file => fs.readFileSync( file, 'utf8' )
const writeFile = ( file, str ) => fs.writeFileSync( file, str, 'utf8' )

const dataURL = getFile( 'pub-tsv.url' ).trim()

const extractData = data => data.split( '\n' )
	.slice( data.split( '\n' ).findIndex( row => row.indexOf( '\tName' ) === 0 ) + 1 )
	.map( row => row.split( '\t' ) )
	.filter( row => row[ 0 ] !== 'x' )
	.map( row => ( {
		name: row[ 1 ],
		area: row[ 2 ],
		lat: Number( row[ 7 ] ),
		lon: Number( row[ 8 ] )
	} ) )
	.filter( row => row.name && row.lat && row.lon )
	.filter( row => !( /closed/i ).test( row.name ) )


module.exports = callback => request.get( dataURL, ( err, res ) => {
	if ( err ) {
		callback( err )
	} else {
		callback( null, extractData( res.body ) )
	}
} )

if ( require.main === module ) {
	module.exports( ( err, data ) => {
		if ( err ) {
			console.error( err )
		} else {
			writeFile( 'pubs.json', JSON.stringify( data, null, '\t' ) )
		}
	} )
}
