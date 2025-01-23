import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = async (search) => {
	const request = axios.get(`${BASE_URL}/all`)

	return request.then((response) => {
		const data = response.data

		if (search) {
			const result = data.filter((country) =>
				country.name.common.toLowerCase().startsWith(search.toLowerCase())
			)

			return result
		} else {
			return data
		}
	})
}

const getCountry = async (name) => {
	const request = axios.get(`${BASE_URL}/name/${name}`)

	return request.then((response) => response.data)
}
const getCapitalWeather = async (capital, tld) => {
	const request = axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${capital},${tld}&APPID=${
			import.meta.env.WEATHER_API_KEY
		}`
	)

	return request.then((response) => response.data)
}

export default { getAllCountries, getCountry, getCapitalWeather }
