import React from 'react'
import Notification from './Notification'

const Heading = ({ text, message }) => {

  return (
    <div>
      <h2>{text}</h2>
      <Notification message={message} />
    </div>
  )
}

export default Heading
