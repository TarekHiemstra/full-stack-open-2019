import React from 'react'
import Country from './Country'


const Countries = ({ filter, countries }) => {
  console.log(countries)

  const countriesFiltered = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  if (countriesFiltered.length === countries.length) {
    return (
      <div>
      </div>
    )
  } else if (countriesFiltered.length === 1) {
    return (
      countriesFiltered.map(country =>
        <div key={country.name}>
          <h1><Country name={country.name} /></h1>
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
        </div>
      )
    )
  } else if (countriesFiltered.length <= 10) {
    return (
      countriesFiltered.map(country =>
        <Country key={country.name} name={country.name} />
      )
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

export default Countries
