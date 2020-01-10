const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message: message
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: null,
      })
    }, time * 1000)
  }
}

export default notificationReducer

