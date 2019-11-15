import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // Application's effect
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
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
    const duplicateCheck = persons.find(person => person.name === newName)
    if (typeof duplicateCheck !== 'undefined' && duplicateCheck.number !== newNumber) {
      personService
        .update(duplicateCheck.id, { name: duplicateCheck.name, number: newNumber})
        .then(returnedPerson => {
          if (window.confirm(`${returnedPerson.name} is already added to phonebook, 
            replace the old number with a new one?`)) {
            setPersons(persons.map(person => 
                      person.id !== duplicateCheck.id ? person : returnedPerson))
          }
          setNewName('')
          setNewNumber('')
        })
        return
    } else if (typeof duplicateCheck !== 'undefined') {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
    }

    // If the name is not in phonebook, add a new person
    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
    })
  }

  const deleteName = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.value)
    personService.remove(persons[id -1])
    // Without the next line, a user would have to refresh the page manually.
    setPersons(persons.filter(person => person.id !== id ))
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
      <Persons filter={newFilter} persons={persons} deleteName={deleteName} />
    </div>
  )
}

export default App
