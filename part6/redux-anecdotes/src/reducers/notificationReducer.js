const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const showNotification = (message) => {
  return {
    type: 'NOTIFICATION',
    message
  }
}

export const hideNotification = () => {
  return {
    type: 'NOTIFICATION',
    message: null
  }
}

export default notificationReducer

