import React, {useState, useEffect} from 'react';
import axios from 'axios'
import TextField from './components/TextField';
import Countries from './components/Countries';

const App = () => {

  // Application's state
  const [countries, setCountries] = useState([])
  const [capitalCity, setCapitalCity] = useState('Helsinki')
  const [weather, setWeather] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newAccessKey, setNewAccessKey] = useState('')

  // Application's effect
  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
  axios
    .get(`http://api.weatherstack.com/current?access_key=${newAccessKey}&query=${capitalCity}`)
    .then(response => {
        setWeather(response.data)
    })
  }, [newAccessKey, capitalCity])

  // Application's handlers
  const handleAccessKeyChange = (event) => setNewAccessKey(event.target.value)
  const handleFilterChange = (event) => {
    if(weather.hasOwnProperty('error')) {
      alert(`${weather.error.type}`)
    } else {
      setNewFilter(event.target.value)
    }
  }
  const showCountry = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }
  const handleCountryChange = (capital) => setCapitalCity(capital)

  return (
    <div>
      <TextField 
        text='Enter your weatherstack.com access key first' 
        value={newAccessKey} 
        onChange={handleAccessKeyChange} 
      />
      <br />
      <TextField 
        text='find countries' 
        value={newFilter} 
        onChange={handleFilterChange} 
      />
      <Countries 
        filter={newFilter} 
        countries={countries}
        weather={weather} 
        showCountry={showCountry}
        handleCountryChange={handleCountryChange}
      />
    </div>
  )
}

export default App;
