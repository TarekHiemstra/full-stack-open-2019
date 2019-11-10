import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries filter={newFilter} countries={countries} />
    </div>
  );
}

export default App;
