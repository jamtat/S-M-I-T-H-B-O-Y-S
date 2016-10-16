'use strict'

const qs = s => document.querySelector( s )

const SMITHBOYS = {

	map: null,
	location: null,
	template: qs( '#info-template' ),

	getLocation: callback => {
		navigator.geolocation.getCurrentPosition(
			location => {

				SMITHBOYS.location = {
					lat: location.coords.latitude,
					lng: location.coords.longitude
				}

				callback()
			},
			err => {
				console.error( err )
				callback( err )
				window.alert( `Without your location we can't show you your nearest smiths` )
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

		pubs.map( pub => new google.maps.Marker( {
			map: SMITHBOYS.map,
			position: {
				lat: pub.lat,
				lng: pub.lon
			},
			title: pub.name
		} ) ).forEach( marker => {

			let infoWindow = new google.maps.InfoWindow( {
				content: marker.title
			} )

			marker.addListener( 'click', () => {
				infoWindow.open( marker.map, marker )
			} )

		} )
	},

	centreMap: () => {
		if ( SMITHBOYS.map ) {
			SMITHBOYS.map.setCenter( SMITHBOYS.location )
			SMITHBOYS.map.setZoom( 13 )
		}
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	if ( !SMITHBOYS.location ) {
		SMITHBOYS.getLocation( err => {
			if ( !err )
				SMITHBOYS.centreMap()
		} )
	}
} )


window.initMap = SMITHBOYS.initMap

module.exports = SMITHBOYS
