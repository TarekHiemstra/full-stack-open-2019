import React from 'react'

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1><span>{country.name}</span></h1>
      <p>capital {country.capital}<br />population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}<br /></li>
        )}
      </ul>
      <p>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`} 
        height="60" 
        width="60" 
      />
      </p>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b> {weather['current'].temperature} Celcius</p>
      <img src={weather['current'].weather_icons[0]} alt='weather icon' />
      <p><b>wind: </b> {weather['current'].wind_speed} kph direction {weather['current'].wind_dir}</p>
    </div>
  )
}

export default Country
