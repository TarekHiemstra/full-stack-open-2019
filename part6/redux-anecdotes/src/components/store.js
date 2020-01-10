import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import filterReducer from '../reducers/filterReducer'
import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer.js'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store
