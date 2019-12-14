import React from 'react'

const CurrentUser = ({ user, handleLogout }) => {

  return (
    <div>
      {user.name} logged in
      <button type='button' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default CurrentUser
