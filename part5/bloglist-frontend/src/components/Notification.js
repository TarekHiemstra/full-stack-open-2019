import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return (
    <div className={loggedUserJSON ? 'confirmation' : 'error'}>
      {message}
    </div>
  )
}
export default Notification
