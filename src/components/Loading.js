import React from 'react'
import shuffle from 'lodash/shuffle'
import './Loading.css'

import logo from '../img/logo.svg'

const SMITHY_THINGS = shuffle( `
round under a tenner in soho
cheeky 2pm sausage roll
mustard from the fires of hell
bingo on the stingo
consuming a lifetime's supply of wheat beer
single schnapps or a double wiskey?
for fuck sake don't swear
in bed by 11:25
you can never visit just one
`.trim().split( '\n' ) )

class Ticker extends React.Component {
	state = {
		index: 0,
		items: this.props.items
	}

	interval = null

	componentDidMount() {
		this.interval = setInterval( this.updateIndex, 500 )
	}

	componentWillUnmount() {
		clearInterval( this.interval )
	}

	updateIndex = () => this.setState( {
		index: (this.state.index + 1) % this.props.items.length
	} )

	render() {
		const { items } = this.props
		const { index } = this.state
		return items[ index ]
	}
}

const Loading = () => {

	return (
		<div className='loading'>
			<img
				src={ logo }
				alt='logo' />
			<div className='dividing-bar'></div>
			<div className='megalols'>
				<Ticker items={ SMITHY_THINGS } />
			</div>
		</div>
	)
}

export default Loading
