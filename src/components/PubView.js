import React from 'react'
import { computeDistanceToPub } from '../lib/utils'
import './PubView.css'

const PubView = ( { pub, location, onClose } ) => {

	if ( !pub )
		return null

	return (
		<div className='pub-view'>
			<div className='pub-view-left'>
				<div className='pub-view-name'>
					{ pub.name }
				</div>
				<div className='pub-view-address'>
					<div className='pub-view-street'>
						{ pub.address }
					</div>
					<div className='pub-view-postcode'>
						{ pub.postcode }
					</div>
				</div>
			</div>
			<div className='pub-view-right'>
				<DistanceToPub
					location={ location }
					pub={ pub } />
			</div>
		</div>
	)
}

const DistanceToPub = ( { location, pub } ) => {
	if ( !location || !pub ) {
		return null
	}

	const distance = computeDistanceToPub( location, pub )

	return (
		<div className='pub-view-distance'>
			{ `${distance.toFixed(2)}km` }
		</div>
	)
}

export default PubView
