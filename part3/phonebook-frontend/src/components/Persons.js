import React from 'react'
import Person from './Person'

const Persons = ({ filter, persons, deleteName }) => {
  return (
    persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <span key={person.id}>
          <Person 
            name={person.name} 
            number={person.number} 
          />
          {' '}
          <button 
            type="button" 
            value={person.id}
            onClick={deleteName}>
            delete
          </button>
          <br />
        </span>
      )
  )
}

export default Persons
