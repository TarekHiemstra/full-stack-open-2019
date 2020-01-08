const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_FILTER':
      return action.data.filter
    default:
      return state
  }
}

export const filterAnecdotes = filter => {
  return {
    type: 'NEW_FILTER',
    data: { filter }
  }
}

export default filterReducer
