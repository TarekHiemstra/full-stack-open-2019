import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

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
  const [confirmationMessage, setConfirmationMessage] = useState(null)

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
        setConfirmationMessage(`Added ${response.name}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
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
      <h1>Phonebook</h1>

      <Notification message={confirmationMessage} />

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm onSubmit={addName}
                  valueName={newName}
                  onChangeName={handleNameChange}
                  valueNumber={newNumber}
                  onChangeNumber={handleNumberChange} 
      />

      <h2>Numbers</h2>
      <Persons filter={newFilter} persons={persons} deleteName={deleteName} />
    </div>
  )
}

export default App
