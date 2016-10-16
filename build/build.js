'use strict'

const fs = require( 'fs-extra' )
const path = require( 'path' )
const less = require( './less' )
const js = require( './js' )
const chokidar = require( 'chokidar' )
const resolve = loc => path.resolve( loc.join( '' ) )


const watcher = ( fn ) => ( event, path ) => {
	console.log( event, path )
	fn()
}

less()
js()

chokidar.watch( [ 'src/**/*.less', 'src/**/*.css' ] ).on( 'all', watcher( less ) )
chokidar.watch( [ 'src/**/*.js' ] ).on( 'all', watcher( js ) )
