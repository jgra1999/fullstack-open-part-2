import axios from 'axios'

const BASE_URL = 'https://fullstack-open-part3-c8j6.onrender.com'

const getAll = async (search) => {
	const request = axios.get(`${BASE_URL}/api/persons`)

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
	const request = axios.post(`${BASE_URL}/api/persons`, newPerson)

	return request
		.then((response) => response.data)
		.catch((error) => {
			console.log(error)
		})
}

const updatePersonNumber = async (id, updatedNumber) => {
	const request = axios.put(`${BASE_URL}/api/persons/${id}`, updatedNumber)

	return request
		.then((response) => response.statusText)
		.catch((error) => {
			console.log(error)
		})
}

const deletePerson = async (id) => {
	const request = axios.delete(`${BASE_URL}/api/persons/${id}`)

	return request
		.then((response) => response)
		.catch((error) => {
			console.log(error)
		})
}

export default { getAll, addNewPerson, deletePerson, updatePersonNumber }
