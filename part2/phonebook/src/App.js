import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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
    const personObject = {name: newName, number: newNumber}
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  console.log(persons[0].name)
  const listAllPersons =
    persons.filter(person =>
    person.name.includes(newFilter)).map(person =>
    <div key={person.name}>{person.name} {person.number}<br /></div>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filters shown with<input value={newFilter} onChange={handleFilterChange} /></div>
      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <h3>Numbers</h3>
      {listAllPersons}
    </div>
  )
}

export default App
