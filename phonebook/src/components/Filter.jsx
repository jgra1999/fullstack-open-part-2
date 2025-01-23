import React from 'react'

const Filter = ({ handleSearch }) => {
	return (
		<input
			type='text'
			placeholder='Type a name...'
			onChange={(e) => handleSearch(e.target.value)}
		/>
	)
}

export default Filter
