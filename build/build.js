'use strict'

const less = require( './less' )
const js = require( './js' )
const chokidar = require( 'chokidar' )


const watcher = ( fn ) => ( event, path ) => {
	console.info( event, path )
	fn()
}

less()
js()

chokidar.watch( [ 'src/**/*.less', 'src/**/*.css' ] ).on( 'all', watcher( less ) )
chokidar.watch( [ 'src/**/*.js' ] ).on( 'all', watcher( js ) )
