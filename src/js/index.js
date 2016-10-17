'use strict'

const haversine = require( 'haversine' )
const qs = s => document.querySelector( s )

const SMITHBOYS = {

	map: null,
	location: null,
	template: ( () => {
		let temp = qs( '#info-template' ).cloneNode( true )
		temp.id = ''
		temp.className = 'info-popup'
		return temp
	} )(),

	openPopup: null,

	makeInfoWindow: pub => {
		const template = SMITHBOYS.template.cloneNode( true )

		Object.keys( pub ).forEach( k => {
			let el = template.querySelector( `.${k}` )
			if ( !el )
				return
			el.innerHTML = pub[ k ]
		} )

		pub.content = template

		pub.infoWindow = new google.maps.InfoWindow( {
			content: template
		} )

		return template
	},

	getLocation: callback => {
		navigator.geolocation.getCurrentPosition(
			location => {
				SMITHBOYS.location = {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}

				pubs.forEach( pub => {
					pub.distance = haversine( {
						latitude: pub.latitude,
						longitude: pub.longitude
					}, {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude
					} )
				} )

				pubs.sort( ( a, b ) => a.distance - b.distance )

				SMITHBOYS.markUserLocation()

				SMITHBOYS.centreMapWithPub( pubs[ 0 ] )
				SMITHBOYS.markPub( pubs[ 0 ] )

				callback()
			},
			err => {
				console.error( err )
				callback( err )
				window.alert( `Without your location we can't show you your nearest smiths` )
			} )
	},

	markUserLocation: () => {
		if ( !SMITHBOYS.map || !SMITHBOYS.location )
			return

		new google.maps.Marker( {
			position: SMITHBOYS.location,
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 7,
				fillOpacity: 1,
				fillColor: '#4286f4',
				strokeColor: 'white',
				strokeWeight: 2
			},
			map: SMITHBOYS.map
		} )
	},

	initMap: () => {

		SMITHBOYS.map = new google.maps.Map(
			qs( '#map' ), {
				zoom: 8,
				center: SMITHBOYS.location ? SMITHBOYS.location : {
					lat: 51.5074,
					lng: 0.1278
				}
			} )

		SMITHBOYS.markUserLocation()

		pubs.map( pub => new google.maps.Marker( {
			map: SMITHBOYS.map,
			position: {
				lat: pub.latitude,
				lng: pub.longitude
			},
			title: pub.name
		} ) ).forEach( ( marker, i ) => {

			const pub = pubs[ i ]

			pub.marker = marker
			SMITHBOYS.makeInfoWindow( pub )

			marker.addListener( 'click', () => {
				if ( pub.content )
					pub.content.querySelector( '.distance' ).innerHTML = `${pub.distance.toFixed(1)}km`

				if ( SMITHBOYS.openPopup )
					SMITHBOYS.openPopup.close()

				pub.infoWindow.open( marker.map, marker )
				SMITHBOYS.openPopup = pub.infoWindow

				SMITHBOYS.centreMapWithPub( pub )
			} )

		} )
	},

	centreMap: () => {
		if ( !SMITHBOYS.map )
			return

		SMITHBOYS.map.setCenter( SMITHBOYS.location )
		SMITHBOYS.map.setZoom( 13 )
	},

	centreMapWithPub: pub => {
		if ( !SMITHBOYS.map )
			return

		let bounds = new google.maps.LatLngBounds()
		bounds.extend( SMITHBOYS.location )

		bounds.extend( {
			lat: pub.latitude,
			lng: pub.longitude
		} )

		SMITHBOYS.map.setCenter( bounds.getCenter() )
		SMITHBOYS.map.fitBounds( bounds )
	},

	markPub: pub => {
		const path = [ {
			lat: pub.latitude,
			lng: pub.longitude
		}, SMITHBOYS.location ]

		const lineSymbol = {
			path: 'M 0,-1 0,1',
			strokeOpacity: 0.7,
			scale: 4
		}

		const icons = [ {
			icon: lineSymbol,
			offset: '0',
			repeat: '20px'
		} ]

		new google.maps.Polyline( {
			map: SMITHBOYS.map,
			path,
			icons,
			strokeOpacity: 0
		} )

	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	if ( !SMITHBOYS.location )
		SMITHBOYS.getLocation( () => {} )
} )


window.initMap = SMITHBOYS.initMap

module.exports = SMITHBOYS
