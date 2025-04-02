import axios from 'axios'

const BASE_URL = '/api/phonebook'

const getAll = async (search) => {
	const request = axios.get(BASE_URL)

	return request
		.then((response) => {
			const data = response.data

			if (search) {
				const result = data.filter((person) =>
					person.name.toLowerCase().startsWith(search.toLowerCase())
				)

				return result
			} else {
				return data
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

const addNewPerson = async (newPerson) => {
	const request = axios.post(`${BASE_URL}`, newPerson)

	return request
		.then((response) => response.data)
		.catch((error) => {
			console.log(error)
		})
}

const updatePersonNumber = async (id, updatedNumber) => {
	const request = axios.put(`${BASE_URL}/${id}`, updatedNumber)

	return request
		.then((response) => response.statusText)
		.catch((error) => {
			console.log(error)
		})
}

const deletePerson = async (id) => {
	const request = axios.delete(`${BASE_URL}/${id}`)

	return request
		.then((response) => response)
		.catch((error) => {
			console.log(error)
		})
}

export default { getAll, addNewPerson, deletePerson, updatePersonNumber }
