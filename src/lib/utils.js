import haversine from 'haversine'

export const timer = delay => new Promise( resolve => setTimeout( resolve, delay ) )

export const computeDistanceToPub = ( location, pub ) => haversine( {
	latitude: location.lat,
	longitude: location.lng
}, {
	latitude: pub.lat,
	longitude: pub.lng
} )
