import React from 'react'

const PersonForm = ({
	handleNewNumber,
	handleNewName,
	handleAddNewPerson,
	nameValue,
	phoneValue
}) => {
	return (
		<form onSubmit={handleAddNewPerson}>
			<div className='input__container'>
				<label htmlFor='name'>Person Name:</label>
				<input value={nameValue} name='name' onChange={handleNewName} />
			</div>
			<div className='input__container'>
				<label htmlFor='tel'>Phone Number:</label>
				<input value={phoneValue} name='tel' onChange={handleNewNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

export default PersonForm
