const notificationReducer = (state = 'Welcome!!', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export default notificationReducer

