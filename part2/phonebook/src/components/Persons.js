import React from 'react'
import Person from './Person'

const Persons = ({ filter, persons }) => {
  return (
    persons.filter(person =>
      person.name.includes(filter)).map(person =>
      <Person key={person.name} name={person.name} number={person.number} />)
  )
}
export default Persons
