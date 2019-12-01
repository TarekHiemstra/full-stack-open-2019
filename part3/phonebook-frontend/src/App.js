import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  // Application's state
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setmessage] = useState(null)
  const [messageType, setMessageType] = useState(null) // 'confirmation' or 'error'

  // Application's effect
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        })
  }, [])

  // Event handlers
  const addName = (event) => {
    event.preventDefault()

    // Check for duplicates
    const duplicateCheck = persons.find(person => person.name === newName)
    if (typeof duplicateCheck !== 'undefined' && duplicateCheck.number !== newNumber) {
      if (window.confirm(`${duplicateCheck.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicateCheck.id, { name: duplicateCheck.name, number: newNumber})
          .then(returnedPerson => {
              setPersons(persons.map(person => 
                        person.id !== duplicateCheck.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
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
        setMessageType('confirmation')
        setmessage(`Added ${response.name}`)
        setTimeout(() => {
          setmessage(null)
          setMessageType(null)
        }, 5000)
      })
      .catch(error => {
        setMessageType('error')
        setmessage(`${JSON.stringify(error.response.data)}`)
        setTimeout(() => {
          setmessage(null)
          setMessageType('error')
        }, 5000)
      })
  }

  const deleteName = (event) => {
    event.preventDefault()
    const personToBeRemoved = persons.find(person => person.id === event.target.value)
    const id = personToBeRemoved.id
    const name = personToBeRemoved.name
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id)
      .catch(error => {
        setMessageType('error')
        setmessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setmessage(null)
          setMessageType('error')
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
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
