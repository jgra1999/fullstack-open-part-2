import React from 'react'

const Persons = ({ search, deletePerson }) => {
	return (
		<div className='persons__list'>
			{search.map((person) => (
				<div key={person.id} className='persons__item'>
					<h3>
						{person.name} | {person.number}
					</h3>

					<button onClick={() => deletePerson(person.id)}>Delete</button>
				</div>
			))}
		</div>
	)
}

export default Persons
