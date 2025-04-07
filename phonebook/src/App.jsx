import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phoneBookService from './services/phonebook'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const PhoneBook = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [search, setSearch] = useState('')
	const [successMessage, setSuccessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	const fetchPhoneBookData = () => {
		phoneBookService.getAll(search).then((data) => {
			setPersons(data)
		})
	}

	const handleAddNewPerson = (e) => {
		e.preventDefault()

		let nameValidator = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		)

		const differentPhoneValidator = persons.find(
			(person) => person.number === newNumber
		)

		if (nameValidator) {
			if (!differentPhoneValidator) {
				window.confirm(
					`${newName} is already added to the phonebook, do you want to replace the old number with these one?`
				)

				persons.map((person) => {
					if (person.name.toLowerCase() === newName.toLowerCase()) {
						phoneBookService
							.updatePersonNumber(person.id, { ...person, number: newNumber })
							.then((response) => {
								fetchPhoneBookData()
								setNewName('')
								setNewNumber('')
								setSuccessMessage('Number Updated')

								setTimeout(() => {
									setSuccessMessage(null)
								}, 3000)
							})
							.catch((error) => {
								const errorMessage =
									error.response && error.response.data && error.response.data.error
										? error.response.data.error
										: 'An unexpected error occurred while updating the number.'

								setErrorMessage(errorMessage)

								setTimeout(() => {
									setErrorMessage(null)
								}, 3000)
							})
					}
				})
			} else {
				alert(`${newName} is already added to phonebook`)
			}
		} else {
			const newPerson = { name: newName, number: newNumber }

			phoneBookService
				.addNewPerson(newPerson)
				.then((response) => {
					setPersons([...persons, response])
					setNewName('')
					setNewNumber('')
					setSuccessMessage(`Added ${newName}`)

					setTimeout(() => {
						setSuccessMessage(null)
					}, 3000)
				})
				.catch((error) => {
					const errorMessage =
						error.response && error.response.data && error.response.data.error
							? error.response.data.error
							: 'An unexpected error occurred while adding the person.'

					setErrorMessage(errorMessage)

					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
		}
	}

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this person?')) {
			phoneBookService
				.deletePerson(id)
				.then((response) => {
					fetchPhoneBookData()
					setSuccessMessage(`Contact deleted`)

					setTimeout(() => {
						setSuccessMessage(null)
					}, 3000)
				})
				.catch((error) => {
					setErrorMessage(`Can't delete, ${error}`)

					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
		}
	}

	useEffect(() => {
		fetchPhoneBookData()
	}, [search])

	return (
		<div>
			<h1>PhoneBook</h1>
			{successMessage && <SuccessNotification message={successMessage} />}
			{errorMessage && <ErrorNotification message={errorMessage} />}

			<Filter handleSearch={setSearch} />

			<h2>Add a new</h2>
			<PersonForm
				handleNewName={(e) => setNewName(e.target.value)}
				handleNewNumber={(e) => setNewNumber(e.target.value)}
				handleAddNewPerson={handleAddNewPerson}
				nameValue={newName}
				phoneValue={newNumber}
			/>

			<h2>Numbers</h2>

			<Persons search={persons} deletePerson={handleDelete} />

			{persons.length <= 0 && <span>No results were found</span>}
		</div>
	)
}

export default PhoneBook
