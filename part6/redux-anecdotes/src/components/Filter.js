import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(
      filterAnecdotes(event.target.value)
    )
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
