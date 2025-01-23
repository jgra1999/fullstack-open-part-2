import { useEffect, useState } from 'react'
import countriesService from './services/countries__search'
import CountryInfo from './components/CountryInfo'

const Countries = () => {
	const [countries, setCountries] = useState([])
	const [capitalWeather, setCapitalWeather] = useState({})
	const [searchCountry, setSearchCountry] = useState('')

	const handleCountryInfo = (country) => {
		countriesService
			.getCountry(country.name.common)
			.then((response) => setCountries([response]))
		countriesService
			.getCapitalWeather(country.capital, country.tld)
			.then((response) => setCapitalWeather(response))
	}

	useEffect(() => {
		countriesService
			.getAllCountries(searchCountry)
			.then((response) => setCountries(response))

		if (countries.length === 1) {
			countriesService
				.getCapitalWeather(countries[0].capital, countries[0].tld)
				.then((response) => setCapitalWeather(response))
		}
	}, [searchCountry])
	return (
		<div>
			<h1>Country Search</h1>

			<input
				type='text'
				className='searcher'
				placeholder='Type a country ...'
				onChange={(e) => setSearchCountry(e.target.value)}
			/>

			{countries.length > 10 ? (
				<p>Too many matches, specify another filter</p>
			) : countries.length === 1 ? (
				<CountryInfo country={countries[0]} weather={capitalWeather} />
			) : (
				<ul>
					{countries.map((country) => (
						<li key={country.cca2}>
							<span>{country.name.common}</span>
							<button onClick={() => handleCountryInfo(country)}>Show more</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Countries
