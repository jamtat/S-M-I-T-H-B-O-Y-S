'use strict'

require( 'dotenv' ).config()

require( './build/build' )
const getData = require( './build/get-data' )

const express = require( 'express' )
const app = express()

let pubs = null

app.set( 'view engine', 'pug' )

app.use( '/static', express.static( __dirname + '/static' ) )
app.get( '/', ( req, res ) => res.render( 'index', Object.assign( {
	pubs
}, process.env ) ) )
app.get( '/pubs.json', ( req, res ) => res.json( pubs ) )

console.info( 'Fetching data' )

getData( ( err, data ) => {

	if ( err ) {
		console.info( 'Could not fetch pub data. Using cached' )
		pubs = require( './pubs.json' )
	} else {
		pubs = data
	}

	console.info( `Got data on ${pubs.length} pubs` )
	app.listen( process.env.PORT, () => console.info( 'S M I T H B O Y S started' ) )
} )
