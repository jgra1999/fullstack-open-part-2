import React from 'react'

const Total = ({ parts }) => {
	const totalExercises = parts
		.map((part) => part.exercises)
		.reduce((acc, exercises) => acc + exercises, 0)

	return (
		<p>
			<strong>Total of {totalExercises} exercise</strong>
		</p>
	)
}

export default Total
