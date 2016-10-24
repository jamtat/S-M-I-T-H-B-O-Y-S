'use strict'

require( 'dotenv' ).config()
require( './build/build' )
const getData = require( './build/get-data' )

const express = require( 'express' )
const app = express()

let pubs = null

app.set( 'view engine', 'pug' )

app.use( '/health', ( req, res ) => res.status( 200 ).end() )

app.use( '/env', ( req, res ) => res.send( `Version: ${process.version}` ) )

app.use( '/static', express.static( __dirname + '/built' ) )
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
	const host = process.env.HOST ? process.env.HOST : ''
	const port = process.env.PORT ? process.env.PORT : 9003

	console.info( `Listening on ${host}:${port}` )

	if ( host ) {
		app.listen( host, port, () => console.info( 'S M I T H B O Y S started' ) )
	} else {
		app.listen( port, () => console.info( 'S M I T H B O Y S started' ) )
	}
} )
