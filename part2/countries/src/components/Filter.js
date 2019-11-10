import React from 'react'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <span>find countries </span>
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Filter
