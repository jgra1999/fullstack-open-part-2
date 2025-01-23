import axios from 'axios'

const BASE_URL = 'https://fullstack-open-part3-c8j6.onrender.com/api/persons'

//TODO: Agregar manejo de errores (catch)

const getAll = async (search) => {
	const request = axios.get(BASE_URL)

	return request.then((response) => {
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
}

const addNewPerson = async (newPerson) => {
	const request = axios.post(BASE_URL, newPerson)

	return request.then((response) => response.data)
}

const updatePersonNumber = async (id, updatedNumber) => {
	const request = axios.put(`${BASE_URL}/${id}`, updatedNumber)

	return request.then((response) => response.statusText)
}

const deletePerson = async (id) => {
	const request = axios.delete(`${BASE_URL}/${id}`)

	return request.then((response) => response)
}

export default { getAll, addNewPerson, deletePerson, updatePersonNumber }
