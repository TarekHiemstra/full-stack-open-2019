import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () => axios.get(baseUrl)
const create = newObject => axios.post(baseUrl, newObject)

const App = () => {
  // Application's effect
  useEffect(() => {
    getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  // Application's state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // Event handlers
  const addName = (event) => {
    event.preventDefault()
    // Check for duplicates
    const checkForDuplicate = persons.find(person => person.name === newName)
    if (typeof checkForDuplicate !== 'undefined') {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    create({ name: newName, number: newNumber })
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm onSubmit={addName}
                  valueName={newName}
                  onChangeName={handleNameChange}
                  valueNumber={newNumber}
                  onChangeNumber={handleNumberChange} 
      />

      <h3>Numbers</h3>
      <Persons filter={newFilter} persons={persons} />
    </div>
  )
}

export default App
