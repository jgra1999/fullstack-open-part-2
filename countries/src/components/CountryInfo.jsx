import React from 'react'

const CountryInfo = ({ country, weather }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>

			<h4>Capital: {country.capital}</h4>
			<h4>Area: {country.area}</h4>

			<h3>Languages:</h3>
			<ul>
				{Object.keys(country.languages).map((key) => (
					<li key={key}>{country.languages[key]}</li>
				))}
			</ul>

			<img src={country.flags.png} alt='' />

			<h3>Weather in {country.capital}</h3>

			<h4>Temperature: {weather.main.temp} °C</h4>
			<h4>Wind: {weather.wind.speed} m/s</h4>
		</div>
	)
}

export default CountryInfo
